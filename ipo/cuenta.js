'use strict';
(() => {
  const config = window.IPO_CUENTA_CONFIG;
  const SESSION_KEY = 'ipo_drive_session_v1';
  let credential, account, tokenClient, identity, fatal = '', sdkPromise;
  let panel;
  try { credential = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch (_) {}
  const configured = Boolean(config.googleClientId);
  const drive = crearDriveIPO({ token: () => credential?.access_token || '' });
  function render() {
    if (!panel) return;
    panel.querySelector('[data-email]').textContent = identity?.email || 'Tu progreso, en tu cuenta institucional';
    panel.querySelector('[data-status]').textContent = fatal || (!configured ? 'El guardado en Drive aún no está activado. Puedes estudiar y guardar el progreso en este navegador.' : account?.status || 'Puedes conectar tu Drive institucional.');
    panel.querySelector('[data-connect]').hidden = Boolean(account?.user && !fatal && credential?.expires_at > Date.now());
    panel.querySelector('[data-connect]').disabled = !configured;
    panel.querySelector('[data-logout]').hidden = !credential;
    panel.querySelector('[data-sync]').hidden = !account?.user || !account.ready;
    panel.querySelector('[data-recover]').hidden = !account?.conflict;
    panel.querySelector('[data-export]').hidden = !account?.user || !account.ready;
    document.querySelectorAll('main > *').forEach(el => {
      if (el !== panel && el.tagName !== 'HEADER' && el.tagName !== 'SCRIPT') el.inert = Boolean(fatal || account?.conflict);
    });
    panel.querySelector('[data-import]').hidden = !account?.user || !account.ready || location.pathname.split('/').pop() !== 'cuenta.html';
  }
  function loadSDK() {
    if (window.google?.accounts?.oauth2) return Promise.resolve();
    if (!sdkPromise) sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client'; script.async = true;
      script.onload = resolve; script.onerror = () => { sdkPromise = null; reject(new Error('No se pudo cargar Google. Reintenta la conexión.')); };
      document.head.append(script);
    });
    return sdkPromise;
  }
  function initializeTokenClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({ client_id: config.googleClientId,
      scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.appdata', include_granted_scopes: false,
      callback: response => {
        if (response.error || !response.access_token) { fatal = 'No se completó la conexión con Google.'; render(); return; }
        if (!google.accounts.oauth2.hasGrantedAllScopes(response, 'openid', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/drive.appdata')) {
          fatal = 'Debes autorizar el guardado privado de la aplicación en Drive.'; render(); return;
        }
        credential = { access_token: response.access_token, expires_at: Date.now() + Number(response.expires_in) * 1000 };
        try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(credential)); location.reload(); }
        catch (_) { fatal = 'Activa el almacenamiento de sesión de este navegador para conectar Drive.'; render(); }
      }, error_callback: error => {
        fatal = error.type === 'popup_closed' ? 'Has cerrado la conexión. Puedes volver a intentarlo.' : 'Google no pudo abrir la conexión. Permite la ventana emergente y reintenta.'; render();
      }
    });
  }
  function mount() {
    panel = document.createElement('section'); panel.className = 'card account-panel';
    panel.setAttribute('aria-label', 'Cuenta institucional y guardado');
    panel.innerHTML = '<strong data-email></strong><p data-status role="status" aria-live="polite"></p>' +
      '<div class="actions"><button type="button" data-connect>Conectar Drive institucional</button>' +
      '<button type="button" class="secondary" data-sync hidden>Guardar / Reintentar</button>' +
      '<button type="button" class="secondary" data-export hidden>Descargar copia local</button>' +
      '<button type="button" class="secondary" data-import hidden>Importar mi progreso de este navegador</button>' +
      '<button type="button" class="secondary" data-recover hidden>Recuperar la última copia de Drive</button>' +
      '<button type="button" class="ghost" data-logout hidden>Cerrar sesión</button>' +
      '<a href="cuenta.html">Cómo se guarda</a></div>';
    const header = document.querySelector('main > header');
    if (header) header.after(panel); else document.querySelector('main').prepend(panel);
    panel.querySelector('[data-connect]').onclick = async () => {
      // Precargar evita perder el gesto de usuario al abrir el popup.
      if (!tokenClient) { try { await loadSDK(); initializeTokenClient(); fatal = 'Google está listo. Pulsa de nuevo Conectar Drive institucional.'; } catch (e) { fatal = e.message; } render(); return; }
      tokenClient.requestAccessToken({ prompt: 'select_account' });
    };
    const action = (selector, fn) => { panel.querySelector(selector).onclick = async () => {
      try { fatal = ''; await fn(); } catch (e) { fatal = e.message || 'No se pudo completar la acción.'; } render();
    }; };
    action('[data-sync]', () => account.flush());
    action('[data-import]', async () => { await account.importGuest(); if (!account.dirty) location.reload(); });
    action('[data-recover]', async () => {
      if (!confirm('Se recuperará la última versión de Drive. Descarga primero tu copia local si quieres conservarla. Las versiones anteriores seguirán en tu Drive.')) return;
      await account.restoreCloud(); location.reload();
    });
    action('[data-logout]', async () => {
      if (account?.ready && account.user) await account.logout();
      sessionStorage.removeItem(SESSION_KEY); credential = null;
      location.reload();
    });
    action('[data-export]', () => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([JSON.stringify(account.snapshot(), null, 2)], { type: 'application/json' }));
      link.download = 'mi-progreso-ipo.json'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
    render();
    if (configured) void loadSDK().then(initializeTokenClient).catch(() => { tokenClient = null; });
  }
  window.IPOAccountReady = (async () => {
    account = crearCuentaIPO({ api: drive, storage: localStorage, domains: config.allowedDomains, notify: render });
    window.IPOAccount = account;
    if (credential) {
      if (!configured || credential.expires_at <= Date.now()) throw new Error('Tu sesión de Google ha caducado. Reconecta la misma cuenta para guardar y recuperar el progreso.');
      const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${credential.access_token}` }, signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) throw new Error('No se pudo verificar tu cuenta. Reconecta tu Drive institucional.');
      identity = await response.json();
    }
    await account.start(identity || null);
    window.IPOStorage = account.storage;
  })();
  // Evitar rechazos sin manejar antes de que termine de parsearse la página.
  window.IPOAccountReady.catch(e => { fatal = e.message; render(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  window.addEventListener('storage', event => {
    if (account?.user && event.key === `ipo_cuenta_datos_v1:${account.user.id}`) {
      fatal = 'El progreso cambió en otra pestaña. Descarga tu copia local si tienes cambios pendientes y recarga para continuar.';
      render();
    }
  });
  window.addEventListener('online', () => { if (account?.ready) void account.flush(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && account?.ready) void account.flush(); });
  window.addEventListener('beforeunload', e => {
    if (account?.dirty) { e.preventDefault(); e.returnValue = ''; }
  });
})();
