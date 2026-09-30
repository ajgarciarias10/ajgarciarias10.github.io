# ajgarciarias.dev — Personal Portfolio & Engineering Notes

Live site: <https://ajgarciarias10.github.io>

High-performance personal engineering portfolio and technical field notes for **Antonio José García Arias (Toni)** — AI Engineer & Full-Stack Developer. Designed with a **Blue Cyan** aesthetic inspired by `akkila.dev`, featuring an interactive terminal assistant, multi-category project showcases, technical blog, and HCI active-recall study lab.

---

## ⚡ Highlights

- **Aesthetic & Theme**: Precision Blue Cyan color system (`--accent: #00f0ff`, `--accent-secondary: #38bdf8`) with background tech layers (grid, dots, dynamic torchlight cursor spotlight, and radial vignette). Full dark/light mode toggle with preference persistence.
- **Interactive Terminal (`~/ask-me.sh`)**: In-browser command line assistant answering questions about stack, projects (F1-BUGAMBRA, GmailKeeper, SmartFruitClassifier, CleverTracker), and availability.
- **Bilingual (EN / ES)**: Complete English and Spanish localization handled via lightweight declarative client-side i18n engine in `app.js`.
- **Project Showcase**:
  - **Production [Done]**: *F1-BUGAMBRA* (Real-Time Auction Platform & Telemetry), *GmailKeeper Personal* (Local-First Email Daemon & Privacy Automation), *SmartFruitClassifier* (Bio-Inspired AI & Hugging Face Space).
  - **In Progress**: *CleverTracker* (Computer Vision TFG & Edge Pipeline), *IPO Study Lab* (Active-Recall Interactivo de Interacción Persona-Ordenador).
  - **Future Roadmap**: *CleverClother* (Recomendador de Moda & Grafos), *PC-BUILDER* (Motor de Reglas y Compatibilidad de Hardware).
- **Technical Blog (`/blog/`)**: Field notes and technical analyses with live search and RSS feed (`feed.xml`).
- **Interactive IPO Lab (`/ipo/`)**: Interactive study tool with active recall, flashcards, and progress tracking.

---

## 📁 Repository Structure

```
├── index.html            # Main portfolio landing page
├── styles.css            # Unified responsive stylesheet & theme variables
├── app.js                # Core JS: i18n, terminal, torchlight, lightbox, filters
├── README.md             # Project documentation
├── blog/
│   ├── index.html        # Field notes archive and live search
│   └── feed.xml          # Valid RSS 2.0 feed
├── ipo/                  # Human-Computer Interaction interactive study lab
└── assets/               # Profile photo, CV (Curriculum.pdf), and project screenshots
```

---

## 🚀 Deployment

Served directly by **GitHub Pages** from the `main` branch root:
`Settings → Pages → Source: Deploy from a branch → Branch: main / (root)`.
