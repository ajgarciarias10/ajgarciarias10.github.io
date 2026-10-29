'use strict';
(() => {
  const config = window.IPO_CUENTA_CONFIG;
  let account, identity, fatal = '', connectionPending = false, panel;
  const isConfigured = () => Boolean(config?.firebase?.projectId && window.crearFirebaseIPO);
  function render() {
    if (!panel) return;
    panel.querySelector('[data-email]').textContent = identity?.email || 'Tu progreso y tests de estudio';
    panel.querySelector('[data-status]').textContent = fatal || account?.status || (!isConfigured()
      ? 'El progreso se guarda en este navegador. Firebase no está disponible.'
      : 'Puedes conectar tu cuenta Google para sincronizar el progreso.');
    const connect = panel.querySelector('[data-connect]');
    if (connect) {
      connect.hidden = false;
      connect.textContent = account?.user ? 'Cambiar cuenta de Google' : 'Conectar con Google';
      connect.disabled = connectionPending || !isConfigured();
    }
    const logout = panel.querySelector('[data-logout]'); if (logout) logout.hidden = !account?.user;
    const sync = panel.querySelector('[data-sync]'); if (sync) sync.hidden = !account?.user || !account.ready;
    const recover = panel.querySelector('[data-recover]'); if (recover) recover.hidden = !account?.conflict;
    document.querySelectorAll('main > *').forEach(el => {
      if (el !== panel && el.tagName !== 'HEADER' && el.tagName !== 'SCRIPT') el.inert = Boolean(account?.conflict);
    });
    const importButton = panel.querySelector('[data-import]');
    if (importButton) importButton.hidden = !account?.user || !account.ready || location.pathname.split('/').pop() !== 'cuenta.html';
  }
  function mount() {
    const accountPage = location.pathname.split('/').pop() === 'cuenta.html';
    panel = document.createElement('section'); panel.className = 'card account-panel';
    panel.setAttribute('aria-label', accountPage ? 'Cuenta y guardado' : 'Estado del guardado');
    panel.innerHTML = '<strong data-email></strong><p data-status role="status" aria-live="polite"></p>' + (accountPage ?
      '<div class="actions"><button type="button" data-connect>Conectar con Google</button>' +
      '<button type="button" class="secondary" data-sync hidden>Guardar / Reintentar</button>' +
      '<button type="button" class="secondary" data-import hidden>Importar mi progreso de este navegador</button>' +
      '<button type="button" class="secondary" data-recover hidden>Recuperar la última copia guardada</button>' +
      '<button type="button" class="ghost" data-logout hidden>Desconectar</button></div>' :
      '<div class="actions"><a class="button secondary" href="cuenta.html">Mi cuenta y progreso</a></div>');
    const header = document.querySelector('main > header');
    if (header) header.after(panel); else document.querySelector('main').prepend(panel);
    if (!accountPage) { render(); return; }
    panel.querySelector('[data-connect]').onclick = async () => {
      if (connectionPending) return;
      connectionPending = true; fatal = ''; render();
      try {
        await window.IPOFirebaseReady;
        if (account?.user && account.ready && account.dirty) {
          await account.flush();
          if (account.dirty || account.conflict) throw new Error('Guarda o resuelve los cambios pendientes antes de cambiar de cuenta.');
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        await window.IPOFirebase.auth.signInWithPopup(provider);
        location.reload();
      } catch (e) {
        fatal = e.code === 'auth/unauthorized-domain'
          ? `Firebase no autoriza este dominio todavía. Añade ${location.hostname} a Dominios autorizados en Authentication → Settings.`
          : e.code === 'auth/popup-blocked' ? 'El navegador bloqueó la ventana de Google. Permite ventanas emergentes y vuelve a intentarlo.'
          : e.code === 'auth/operation-not-allowed' ? 'Activa el proveedor Google en Firebase Authentication → Sign-in method.'
          : e.message || 'No se pudo conectar con Google.';
      } finally { connectionPending = false; render(); }
    };
    const action = (selector, fn) => { panel.querySelector(selector).onclick = async () => {
      try { fatal = ''; await fn(); } catch (e) { fatal = e.message || 'No se pudo completar la acción.'; } render();
    }; };
    action('[data-sync]', () => account.flush());
    action('[data-import]', async () => { await account.importGuest(); if (!account.dirty) location.reload(); });
    action('[data-recover]', async () => {
      if (!confirm('Se usará la última versión guardada en Firebase. Descarga primero una copia local si quieres conservarla.')) return;
      await account.restoreCloud(); location.reload();
    });
    action('[data-logout]', async () => {
      if (account?.ready && account.user) await account.logout();
      await window.IPOFirebase.auth.signOut();
      location.reload();
    });
    render();
  }
  window.IPOAccountReady = (async () => {
    try {
      const { auth, authReady } = await window.IPOFirebaseReady;
      const user = await authReady;
      if (user) {
        const googleId = user.providerData?.find(provider => provider.providerId === 'google.com')?.uid;
        identity = { sub: googleId || user.uid, email: user.email, email_verified: user.emailVerified };
      }
      account = crearCuentaIPO({ api: crearFirebaseIPO(), storage: localStorage,
        domains: config.allowedDomains, notify: render });
      window.IPOAccount = account;
      await account.start(identity || null);
      window.IPOStorage = account.storage;
    } catch (e) {
      fatal = e.message || 'No se pudo iniciar la conexión con Firebase.';
      account = crearCuentaIPO({ api: { read: async () => ({ revision: '', values: {} }), write: async () => { throw new Error('Firebase no está disponible.'); } },
        storage: localStorage, domains: ['*'], notify: render });
      window.IPOAccount = account;
      await account.start(null);
      window.IPOStorage = account.storage;
    }
  })();
  window.IPOAccountReady.catch(e => { fatal = e.message; render(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  window.addEventListener('storage', event => {
    if (account?.user && event.key === `ipo_cuenta_datos_v1:${account.user.id}`) {
      fatal = 'El progreso cambió en otra pestaña. Descarga una copia si tienes cambios pendientes y recarga para continuar.'; render();
    }
  });
  window.addEventListener('online', () => { if (account?.ready) void account.flush(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && account?.ready) void account.flush(); });
  window.addEventListener('beforeunload', e => { if (account?.dirty) { e.preventDefault(); e.returnValue = ''; } });
})();
