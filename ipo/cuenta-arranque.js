'use strict';
(async () => {
  try {
    // Nunca cargar progreso de otro usuario mientras se verifica la identidad
    // ni escribir valores vacíos antes de restaurar Drive.
    await window.IPOAccountReady;
    if (window.IPOAccount.conflict) throw new Error('Resuelve el conflicto de Drive con el panel de cuenta antes de continuar.');
    for (const placeholder of document.querySelectorAll('script[data-ipo-script]')) {
      const script = document.createElement('script');
      if (placeholder.dataset.ipoScript) {
        await new Promise((resolve, reject) => {
          script.src = placeholder.dataset.ipoScript;
          script.onload = resolve; script.onerror = () => reject(new Error('No se pudo cargar la página de estudio. Recarga para reintentar.'));
          placeholder.after(script);
        });
      } else { script.textContent = placeholder.textContent; placeholder.after(script); }
    }
  } catch (error) {
    const message = document.createElement('p'); message.className = 'card'; message.setAttribute('role', 'alert');
    message.textContent = error.message;
    document.querySelector('main > header').after(message);
  }
})();
