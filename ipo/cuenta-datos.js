'use strict';
/* Independiente del DOM y del proveedor de transporte, para probar aislamiento,
   restauración y conflictos con dos dispositivos. */
window.crearCuentaIPO = ({ api, storage, domains, notify = () => {}, schedule = setTimeout, cancel = clearTimeout }) => {
  const keys = ['ipo_tests_v1', 'ipo_competencias_v1', 'ipo_conceptos_v1',
    'ipo_uja_progress_v2', 'ipo_tema_profesor_override', 'ipo_calendario_v2',
    'ipo_cal_sync_v1', 'ipo_plan_estudio_v1', 'ipo_recordatorios_v1'];
  let user = null, cache = { revision: '', values: {}, dirty: false }, ready = false;
  let timer, flushing = false, conflict = false, writes = 0;
  let status = 'Comprobando tu cuenta…';
  const announce = text => { status = text; notify(); };
  const permitted = email => domains.includes('*') || domains.includes(String(email || '').toLowerCase().split('@')[1]);
  const cacheKey = () => `ipo_cuenta_datos_v1:${user.id}`;
  const clean = values => Object.fromEntries(keys.filter(k => typeof values?.[k] === 'string').map(k => [k, values[k]]));
  const persist = () => storage.setItem(cacheKey(), JSON.stringify(cache));
  const persistQuietly = () => { try { persist(); } catch (_) { announce('No se puede guardar una copia local. Mantén la página abierta hasta sincronizar.'); } };
  function checkKey(key) { if (!keys.includes(key)) throw new Error('Clave de estudio no permitida'); }
  function checkReady() { if (!ready) throw new Error('La cuenta todavía no está disponible'); }
  const cloud = () => api.read();
  function queue() {
    cancel(timer);
    timer = schedule(() => { void flush(); }, 1200);
  }
  async function start(identity = null) {
    if (!identity) { ready = true; announce('Sin cuenta: el progreso se guarda en este navegador.'); return; }
    if (!identity.email_verified || !identity.sub || !permitted(identity.email)) {
      throw new Error('Conecta un correo institucional admitido y verificado.');
    }
    user = { id: identity.sub, email: identity.email };
    let saved;
    try { saved = JSON.parse(storage.getItem(cacheKey()) || 'null'); } catch (_) {}
    if (saved && typeof saved.revision === 'string') cache = {
      revision: saved.revision, values: clean(saved.values), dirty: Boolean(saved.dirty)
    };
    try {
      const remote = await cloud();
      if (remote.conflict || (cache.dirty && cache.revision !== remote.revision)) {
        conflict = true; announce('Hay cambios en otro dispositivo. Tu copia local se conserva: descárgala antes de recuperar Drive.');
      } else if (cache.dirty) {
        announce('Hay cambios locales pendientes de sincronizar.');
      } else {
        cache = { revision: remote.revision, values: clean(remote.values), dirty: false };
        persistQuietly(); announce('Progreso recuperado de tu Drive institucional.');
      }
    } catch (_) {
      if (!saved) throw new Error('No se pudo recuperar tu progreso. Reintenta la conexión antes de estudiar con esta cuenta.');
      announce('Sin conexión con Drive. Usando tu copia local; los cambios quedan pendientes.');
    }
    ready = true;
    if (cache.dirty && !conflict) queue();
  }
  function write(key, value) {
    checkReady(); checkKey(key);
    if (!user) {
      if (value === null) storage.removeItem(key); else storage.setItem(key, String(value));
      return;
    }
    if (conflict) throw new Error('Resuelve el conflicto antes de seguir guardando');
    if ((cache.values[key] ?? null) === (value === null ? null : String(value))) return;
    if (value === null) delete cache.values[key]; else cache.values[key] = String(value);
    cache.dirty = true; writes++;
    queue();
    announce('Cambios pendientes de sincronizar…');
    persist();
  }
  async function flush() {
    if (!ready || !user || !cache.dirty || conflict || flushing) return;
    cancel(timer); flushing = true;
    const version = writes;
    const values = { ...cache.values };
    announce('Guardando tu progreso…');
    try {
      const data = await api.write(cache.revision, values);
      cache.revision = data.revision;
      cache.dirty = writes !== version;
      persistQuietly();
      announce(cache.dirty ? 'Quedan cambios pendientes de sincronizar…' : 'Progreso guardado en tu Drive institucional.');
    } catch (error) {
      if (error.conflict) conflict = true;
      announce(conflict ? 'Hay cambios en otro dispositivo. Descarga tu copia local y recupera Drive para continuar.' : 'No se pudo sincronizar. Tus cambios siguen pendientes; pulsa Reintentar.');
    } finally {
      flushing = false;
      if (cache.dirty && writes !== version && !conflict) queue();
    }
  }
  async function restoreCloud() {
    if (!user || flushing) throw new Error('Espera a que termine el guardado');
    const remote = await cloud();
    cache = { revision: remote.revision, values: clean(remote.values), dirty: false };
    conflict = false;
    // Crear una nueva versión que reúne las ramas conservadas en Drive.
    cache.dirty = Boolean(remote.conflict); writes++; persistQuietly();
    if (cache.dirty) await flush();
  }
  async function importGuest() {
    if (!user || conflict) throw new Error('Inicia sesión y resuelve los conflictos antes de importar');
    if (Object.keys(cache.values).length) throw new Error('Tu cuenta ya tiene datos. La importación no reemplaza un progreso existente.');
    const values = {};
    keys.forEach(k => { const value = storage.getItem(k); if (value !== null) values[k] = value; });
    if (!Object.keys(values).length) throw new Error('No hay progreso local que importar');
    cache.values = values; cache.dirty = true; writes++; persistQuietly();
    await flush();
  }
  async function logout() {
    await flush();
    if (cache.dirty) throw new Error('Quedan cambios sin guardar. Reintenta la sincronización antes de cerrar sesión.');
    // Retirar también la copia del equipo compartido después de guardar.
    if (user) storage.removeItem(cacheKey());
    user = null; ready = false; cache = { revision: '', values: {}, dirty: false };
  }
  return { keys, start, flush, restoreCloud, importGuest, logout, permitted,
    storage: { getItem(key) { checkReady(); checkKey(key); return user ? cache.values[key] ?? null : storage.getItem(key); },
      setItem: write, removeItem: key => write(key, null) },
    snapshot: () => ({ version: 1, values: { ...cache.values }, revision: cache.revision }),
    get user() { return user; }, get ready() { return ready; }, get dirty() { return cache.dirty; },
    get conflict() { return conflict; }, get status() { return status; }
  };
};
