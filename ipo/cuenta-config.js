'use strict';
// Solo el ID público del cliente OAuth web. No se necesita un client secret.
const _global = typeof window !== 'undefined' ? window : globalThis;
_global.IPO_CUENTA_CONFIG = {
  get googleClientId() {
    try {
      return (typeof localStorage !== 'undefined' ? localStorage.getItem('ipo_google_client_id') : '') || this._clientId || '';
    } catch (_) {
      return this._clientId || '';
    }
  },
  set googleClientId(val) {
    this._clientId = val ? String(val).trim() : '';
    try {
      if (typeof localStorage !== 'undefined') {
        if (this._clientId) localStorage.setItem('ipo_google_client_id', this._clientId);
        else localStorage.removeItem('ipo_google_client_id');
      }
    } catch (_) {}
  },
  _clientId: '',
  allowedDomains: ['red.ujaen.es', 'ujaen.es', 'gmail.com', '*']
};
