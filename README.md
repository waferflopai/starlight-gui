# Starlight GUI

[![npm version](https://badge.fury.io/js/starlight-gui.svg)](https://badge.fury.io/js/starlight-gui)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**A hackable, paper‑themed GUI library** with **14+ components**, zero dependencies, and a fixed sidebar with scrollspy.

- **✨ Hackable** – override every CSS variable.
- **📦 Zero dependencies** – vanilla CSS + JS, no frameworks.
- **🎨 Paper‑hacker aesthetic** – warm, textured, and minimal.
- **📱 Responsive** – adapts to any screen size.
- **⚡ Lightweight** – ~15 KB gzipped.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theming](#theming)
- [Components](#components)
- [JavaScript API](#javascript-api)
- [Browser Support](#browser-support)
- [License](#license)

---

## Installation

### npm

```bash
npm install starlight-gui
```

Then include the CSS and JS in your project:

```html
<link rel="stylesheet" href="node_modules/starlight-gui/starlight.css" />
<script src="node_modules/starlight-gui/starlight.js"></script>
```

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/starlight-gui@2.3.0/starlight.css" />
<script src="https://unpkg.com/starlight-gui@2.3.0/starlight.js"></script>
```

### Direct Download

Clone the repository or download the latest release from GitHub.

---

## Quick Start

Minimal HTML to get started:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="starlight.css">
</head>
<body>
  <!-- Toast container (required) -->
  <div id="sl-toast-container"></div>

  <!-- Overlay for mobile sidebar -->
  <div class="sl-overlay" id="sl-overlay"></div>

  <!-- Fixed Header -->
  <header class="sl-header">
    <button class="sl-menu-btn" id="sl-menu-btn" aria-label="Toggle sidebar">
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <a href="#" class="sl-logo">
      <span class="sl-logo-icon">✦</span>
      <span class="sl-logo-text">My App</span>
    </a>
  </header>

  <!-- Sidebar -->
  <aside class="sl-sidebar" id="sl-sidebar">
    <div class="sl-section">
      <div class="sl-title">Navigation</div>
      <ul class="sl-menu">
        <li><a href="#intro" class="sl-active">Home</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
  </aside>

  <!-- Main content -->
  <main class="sl-main">
    <section class="sl-section-block" id="intro">
      <h1>Welcome</h1>
      <button class="sl-btn sl-primary" onclick="slToast('✨', 'Hello Starlight!')">Show Toast</button>
    </section>
  </main>

  <script src="starlight.js"></script>
</body>
</html>
```

For a complete demo, see the demo.html file.

---

## Theming

All styles are driven by CSS variables. To customize the look, override them in your own `:root` or any parent selector:

```css
:root {
  --sl-paper: #f5f0e8;         /* main background */
  --sl-paper-white: #faf7f2;   /* card / modal background */
  --sl-ink: #1e1c1a;           /* primary text */
  --sl-ink-soft: #3d3a36;      /* secondary text */
  --sl-ink-faded: #7a756e;     /* muted text */
  --sl-accent: #2a6b7c;        /* primary accent */
  --sl-accent-soft: #5a9aa8;   /* hover / focus accent */
  --sl-accent-warm: #a8927a;   /* warm accent (badges) */
  --sl-border: #ddd6cc;        /* borders */
  --sl-border-light: #e8e2d8;  /* lighter borders */
  --sl-radius: 0px;            /* corner radius (0 = sharp) */
  --sl-font-sans: 'Inter', sans-serif;
  --sl-font-mono: 'JetBrains Mono', monospace;
}
```

You can change any variable to match your brand.

---

## Components

Starlight includes 14+ components out of the box:

- **Buttons** – `.sl-btn`, variants `.sl-primary`, `.sl-secondary`, `.sl-ghost`, `.sl-danger`, `.sl-success`, sizes `.sl-sm`, `.sl-lg`

- **Cards** – `.sl-card` with `.sl-card-label`, `.sl-card-value`, `.sl-card-meta`

- **Lists** – `.sl-list` with `.sl-item`, `.sl-item-label`, `.sl-item-title`

- **Badges** – `.sl-badge` with variants `.sl-active`, `.sl-scheduled`, `.sl-complete`, `.sl-warning`

- **Dropdowns** – `.sl-dropdown` with `.sl-toggle` and `.sl-menu`

- **Modals** – `.sl-modal-backdrop` with `.sl-modal`, sizes `.sl-sm`, `.sl-lg`

- **Popups** – `.sl-popup` with `.sl-content`

- **Loaders** – `.sl-spinner`, `.sl-spinner-ring`, `.sl-loader-bar`

- **Tabs** – `.sl-tabs` with `.sl-headers` and `.sl-panels`

- **Tables** – `.sl-table-wrap` wrapping a `<table>`

- **Code blocks** – `.sl-code-block` with syntax‑highlighting classes

- **Toasts** – via `slToast()` function

- **Forms** – `.sl-input`, `.sl-textarea`, `.sl-select`, `.sl-check`, `.sl-form-group`

- **Cyberdeck Doors** – `.sl-deck-field`, `.sl-deck-slot`, `.sl-deck-door`

See the demo for live examples.

---

## JavaScript API

Starlight exposes the following global functions:

| Function | Description |
|----------|-------------|
| `slToast(icon, message, duration)` | Shows a toast notification. Default duration is 3200ms. |
| `slOpenModal(id)` | Opens a modal by its id. |
| `slCloseModal(id)` | Closes a modal. |
| `slOpenPopup(id)` | Opens a popup by its id. |
| `slClosePopup(id)` | Closes a popup. |

### Example Usage

```javascript
slToast('✅', 'Mission complete!');
slOpenModal('myModal');
```

### Sidebar

Toggle the sidebar by adding/removing the class `.open` on `#sl-sidebar` and `#sl-overlay`, and `body.sl-sidebar-open`. The included JavaScript automatically handles the menu button and overlay clicks.

### Tabs

Automatically bind to `<button data-tab="panelId">` and matching `<div id="panelId">`.

### Scrollspy

Automatically highlights sidebar links based on scroll position.

---

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Internet Explorer – not supported

---

## License

MIT © Your Name

---

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.
