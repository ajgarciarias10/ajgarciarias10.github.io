'use strict';
window.crearDriveIPO = ({ token, request = fetch }) => {
  const base = 'https://www.googleapis.com/drive/v3/files';
  async function api(url, options = {}) {
    const response = await request(url, { ...options, headers: { Authorization: `Bearer ${token()}`, ...options.headers }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
      const error = new Error(response.status === 401 ? 'Vuelve a conectar tu cuenta institucional.' : 'No se pudo acceder al guardado en Drive.');
      error.status = response.status; throw error;
    }
    return response.json();
  }
  async function heads() {
    let page = '', files = [];
    do {
      const params = new URLSearchParams({ spaces: 'appDataFolder', q: "trashed = false and appProperties has { key='app' and value='ipo-study-v1' }", fields: 'nextPageToken,files(id,createdTime,description)', pageSize: '1000' });
      if (page) params.set('pageToken', page);
      const data = await api(`${base}?${params}`);
      files.push(...data.files); page = data.nextPageToken || '';
    } while (page);
    const parents = new Set();
    files.forEach(f => { try { JSON.parse(f.description || '[]').forEach(id => parents.add(id)); } catch (_) {} });
    return files.filter(f => !parents.has(f.id)).sort((a, b) => b.createdTime.localeCompare(a.createdTime) || b.id.localeCompare(a.id));
  }
  const revision = files => files.map(f => f.id).sort().join(',');
  async function read() {
    const files = await heads();
    if (!files.length) return { revision: '', values: {}, conflict: false };
    const data = await api(`${base}/${encodeURIComponent(files[0].id)}?alt=media`);
    if (data.version !== 1 || !data.values || typeof data.values !== 'object' || Array.isArray(data.values)) throw new Error('El guardado de Drive tiene un formato incompatible.');
    return { revision: revision(files), values: data.values, conflict: files.length > 1 };
  }
  async function write(expected, values) {
    const files = await heads();
    if (revision(files) !== expected) throw Object.assign(new Error('Cambios en otro dispositivo'), { conflict: true });
    // Versiones inmutables: dos dispositivos que guardan a la vez conservan
    // ambos resultados. La siguiente lectura detecta las ramas y permite elegir.
    const boundary = `ipo_${crypto.randomUUID()}`;
    const metadata = { name: `ipo-progress-${Date.now()}.json`, parents: ['appDataFolder'],
      mimeType: 'application/json', appProperties: { app: 'ipo-study-v1' }, description: JSON.stringify(files.map(f => f.id)) };
    const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify({ version: 1, values })}\r\n--${boundary}--`;
    const saved = await api('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
      method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body });
    const current = await heads();
    if (current.length !== 1 || current[0].id !== saved.id) throw Object.assign(new Error('Guardado simultáneo: ambas copias están en Drive'), { conflict: true });
    return { revision: saved.id };
  }
  return { read, write };
};
