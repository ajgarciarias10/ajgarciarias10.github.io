'use strict';
// Solo el ID público del cliente OAuth web. No se necesita un client secret.
const _global = typeof window !== 'undefined' ? window : globalThis;
_global.IPO_CUENTA_CONFIG = {
  // Client ID público de la aplicación web de IPO Study Lab. No es un secreto.
  // El origen de la web debe estar autorizado en Google Cloud Console.
  googleClientId: '409203504068-9e5vv109h5tfmlpr5me64u50jkkq6ci0.apps.googleusercontent.com',
  // Solo identidades institucionales verificadas. La lista es deliberadamente
  // explícita: nunca aceptar dominios comodín ni cuentas personales.
  allowedDomains: ['red.ujaen.es', 'ujaen.es']
};
