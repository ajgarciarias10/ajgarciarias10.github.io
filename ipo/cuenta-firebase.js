'use strict';
(() => {
  const config = window.IPO_CUENTA_CONFIG?.firebase;
  if (!config || !window.firebase) {
    window.IPOFirebaseReady = Promise.reject(new Error('No se pudo cargar Firebase. Recarga la página e inténtalo de nuevo.'));
    return;
  }
  const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
  const auth = app.auth();
  const db = app.firestore();
  auth.useDeviceLanguage();
  const authReady = new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => { unsubscribe(); resolve(user); });
  });

  function crearFirebaseIPO() {
    const reference = () => {
      const user = auth.currentUser;
      if (!user) throw new Error('Inicia sesión con Google para acceder a tu progreso.');
      return db.collection('users').doc(user.uid).collection('study').doc('progress');
    };
    return {
      async read() {
        const snapshot = await reference().get();
        if (!snapshot.exists) return { revision: '', values: {}, conflict: false };
        const data = snapshot.data();
        if (data.version !== 1 || !data.values || typeof data.values !== 'object' || Array.isArray(data.values)) {
          throw new Error('El progreso guardado tiene un formato incompatible. Descarga una copia antes de continuar.');
        }
        return { revision: data.revision || '', values: data.values, conflict: false };
      },
      async write(expectedRevision, values) {
        const ref = reference();
        const revision = crypto.randomUUID();
        await db.runTransaction(async transaction => {
          const snapshot = await transaction.get(ref);
          const current = snapshot.exists ? (snapshot.data().revision || '') : '';
          if (current !== expectedRevision) {
            const error = new Error('El progreso cambió en otro dispositivo. Tus cambios locales siguen guardados.');
            error.conflict = true;
            throw error;
          }
          transaction.set(ref, { version: 1, revision, values, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        });
        return { revision };
      }
    };
  }
  window.crearFirebaseIPO = crearFirebaseIPO;
  window.IPOFirebase = { auth, db, authReady };
  window.IPOFirebaseReady = Promise.resolve({ auth, db, authReady });
})();
