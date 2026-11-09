# Contexto del proyecto para Claude

Las reglas no están aquí: viven en [`AGENTS.md`](AGENTS.md), el nombre que leen
todas las herramientas. Los pasos de trabajo están en
[`docs/agents/procedimiento.md`](docs/agents/procedimiento.md). Este fichero es
solo contexto; si contradice a esos dos, ganan ellos.

## Qué es esto

Portfolio personal y notas técnicas de Antonio José García Arias, publicado en <https://ajgarciarias10.github.io> (bilingüe EN/ES). Incluye un blog, una herramienta de estudio de IPO (`ipo/`) y la demo anonimizada de GRAPHQLDESK (`graphqldesk/`).

## Stack y estructura

Sitio estático: HTML, CSS y JS planos, sin dependencias ni paso de construcción.

- `index.html`, `styles.css`, `app.js` (i18n EN/ES, terminal, filtros, lightbox).
- `blog/` (notas técnicas, `feed.xml`), `ipo/` (laboratorio de estudio con sincronización de cuenta por Firebase), `graphqldesk/` (demo ya compilada, no se edita a mano), `assets/` (foto, CV, capturas).
- `firestore.rules`, `firebase.json`, `.firebaserc`: Firebase solo para la sincronización de `ipo/`.

## Comandos

    # No hay instalar, probar ni construir.
    # Para verlo en local (sugerido, no documentado antes):
    python3 -m http.server 8000     # y abrir http://localhost:8000
    node --test tool/agent-guard.test.mjs   # único test automatizado

## Dónde se sigue el trabajo

Trabajo abierto: [`docs/BACKLOG.md`](docs/BACKLOG.md). Detalle por funcionalidad:
`docs/trabajo/<slug>/`. Decisiones: `docs/adr/`. No se guardan listas de estado
en este fichero porque quedan obsoletas.
