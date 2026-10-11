'use strict';
(() => {
  const config = window.IPO_CUENTA_CONFIG;
  const SESSION_KEY = 'ipo_drive_session_v1';
  const AUTHORIZED_ORIGIN = 'https://ajgarciarias10.github.io';
  let credential, account, tokenClient, identity, fatal = '', sdkPromise, connectionPending = false;
  let panel;
  try { credential = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch (_) {}
  const isConfigured = () => Boolean(config.googleClientId);
  const drive = crearDriveIPO({ token: () => credential?.access_token || '' });
  function render() {
    if (!panel) return;
    panel.querySelector('[data-email]').textContent = identity?.email || 'Tu progreso y tests de estudio';
    panel.querySelector('[data-status]').textContent = fatal || (!isConfigured() ? 'El progreso se guarda en este navegador. La conexión con Drive aún no está activada.' : account?.status || 'Puedes conectar tu cuenta institucional para sincronizar el progreso.');
    const connect = panel.querySelector('[data-connect]');
    if (connect) {
      connect.hidden = false;
      connect.textContent = account?.user ? 'Cambiar cuenta de Google' : 'Conectar Google Drive';
      connect.disabled = connectionPending || (isConfigured() && !tokenClient && !fatal);
    }
    const logout = panel.querySelector('[data-logout]'); if (logout) logout.hidden = !credential;
    const sync = panel.querySelector('[data-sync]'); if (sync) sync.hidden = !account?.user || !account.ready;
    const recover = panel.querySelector('[data-recover]'); if (recover) recover.hidden = !account?.conflict;
    document.querySelectorAll('main > *').forEach(el => {
      if (el !== panel && el.tagName !== 'HEADER' && el.tagName !== 'SCRIPT') el.inert = Boolean(account?.conflict);
    });
    const importButton = panel.querySelector('[data-import]');
    if (importButton) importButton.hidden = !account?.user || !account.ready || location.pathname.split('/').pop() !== 'cuenta.html';
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
        connectionPending = false;
        if (response.error || !response.access_token) {
          fatal = ['invalid_client', 'origin_mismatch'].includes(response.error)
            ? `Google bloqueó el acceso porque este sitio no está autorizado. En Google Cloud añade ${AUTHORIZED_ORIGIN} en «Orígenes autorizados de JavaScript» del cliente OAuth.`
            : `No se completó la conexión con Google${response.error_description ? `: ${response.error_description}` : '.'}`;
          render(); return;
        }
        if (!google.accounts.oauth2.hasGrantedAllScopes(response, 'openid', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/drive.appdata')) {
          fatal = 'Debes autorizar el guardado privado de la aplicación en Drive.'; render(); return;
        }
        credential = { access_token: response.access_token, expires_at: Date.now() + Number(response.expires_in) * 1000 };
        try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(credential)); location.reload(); }
        catch (_) { fatal = 'Activa el almacenamiento de sesión de este navegador para conectar Drive.'; render(); }
      }, error_callback: error => {
        connectionPending = false;
        fatal = error.type === 'popup_closed'
          ? `Se cerró la ventana de Google. Si mostraba «Acceso bloqueado» o «no registered origin», autoriza ${AUTHORIZED_ORIGIN} en Google Cloud; después vuelve a intentarlo.`
          : 'Google no pudo abrir la conexión. Permite la ventana emergente y reintenta.';
        render();
      }
    });
  }
  function mount() {
    const accountPage = location.pathname.split('/').pop() === 'cuenta.html';
    panel = document.createElement('section'); panel.className = 'card account-panel';
    panel.setAttribute('aria-label', accountPage ? 'Cuenta institucional y guardado' : 'Estado del guardado');
    panel.innerHTML = '<strong data-email></strong><p data-status role="status" aria-live="polite"></p>' + (accountPage ?
      '<div class="actions"><button type="button" data-connect>Conectar Google Drive</button>' +
      '<button type="button" class="secondary" data-sync hidden>Guardar / Reintentar</button>' +
      '<button type="button" class="secondary" data-import hidden>Importar mi progreso de este navegador</button>' +
      '<button type="button" class="secondary" data-recover hidden>Recuperar la última copia de Drive</button>' +
      '<button type="button" class="ghost" data-logout hidden>Desconectar</button></div>' :
      '<div class="actions"><a class="button secondary" href="cuenta.html">Mi cuenta y progreso</a></div>');
    const header = document.querySelector('main > header');
    if (header) header.after(panel); else document.querySelector('main').prepend(panel);
    if (!accountPage) { render(); return; }
    panel.querySelector('[data-connect]').onclick = async () => {
      if (connectionPending) return;
      if (!isConfigured()) {
        fatal = 'La conexión de Drive aún no está activada para esta web. Quien administra el sitio debe configurar su Client ID OAuth.';
        render(); return;
      }
      // Save pending data before replacing the active Google account.
      if (account?.user && account.ready && account.dirty) {
        connectionPending = true; fatal = 'Guardando tu progreso antes de cambiar de cuenta…'; render();
        try { await account.flush(); }
        catch (e) { connectionPending = false; fatal = `No se pudo guardar el progreso. No se ha cambiado de cuenta: ${e.message}`; render(); return; }
        if (account.dirty || account.conflict) {
          connectionPending = false;
          fatal = account.conflict
            ? 'Hay un conflicto entre copias. Recupéralo antes de cambiar de cuenta para conservar el progreso.'
            : 'El progreso sigue pendiente de guardar. Reintenta la sincronización antes de cambiar de cuenta.';
          render(); return;
        }
        connectionPending = false; fatal = '';
      }
      // The SDK is loaded ahead of the click so the popup opens from a user gesture.
      if (!tokenClient) {
        try { if (window.google?.accounts?.oauth2) initializeTokenClient(); }
        catch (_) { tokenClient = null; }
        if (!tokenClient) { fatal = fatal || 'Google todavía se está cargando. Espera un momento y vuelve a pulsar.'; render(); return; }
      }
      connectionPending = true; fatal = ''; render();
      try { tokenClient.requestAccessToken({ prompt: 'select_account' }); }
      catch (_) {
        connectionPending = false;
        fatal = `Google no pudo abrir la ventana. Si aparece «no registered origin», añade ${AUTHORIZED_ORIGIN} a los orígenes JavaScript del cliente OAuth.`;
        render();
      }
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
    render();
    if (isConfigured()) void loadSDK().then(() => { initializeTokenClient(); render(); }).catch(e => { tokenClient = null; fatal = e.message; render(); });
  }
  window.IPOAccountReady = (async () => {
    account = crearCuentaIPO({ api: drive, storage: localStorage, domains: config.allowedDomains, notify: render });
    window.IPOAccount = account;
    if (credential) {
      if (!isConfigured() || credential.expires_at <= Date.now()) {
        sessionStorage.removeItem(SESSION_KEY);
        credential = null;
        fatal = 'Tu sesión de Google ha caducado. Vuelve a conectar tu cuenta para sincronizar con Drive.';
      } else {
        try {
          const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers: { Authorization: `Bearer ${credential.access_token}` }, signal: AbortSignal.timeout(15000)
          });
          if (response.ok) {
            identity = await response.json();
            const selectedDomain = String(identity.email || '').toLowerCase().split('@')[1];
            if (!identity.email_verified || !config.allowedDomains.includes(selectedDomain)) {
              sessionStorage.removeItem(SESSION_KEY);
              credential = null;
              fatal = `Google eligió ${identity.email || 'una cuenta no admitida'}. Vuelve a conectar y selecciona tu cuenta institucional UJA.`;
              identity = null;
            }
          } else {
            sessionStorage.removeItem(SESSION_KEY);
            credential = null;
            fatal = 'No se pudo verificar tu cuenta de Google. Reconecta para sincronizar.';
          }
        } catch (_) {
          fatal = 'Sin conexión para verificar la cuenta. Usando copia local.';
        }
      }
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
