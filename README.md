
# 🔳 QR Code Generator Chrome Extension

A modern Chrome extension that generates QR codes for the current tab URL. Includes support for favicon embedding, history tracking, QR scanning, and export options — designed with performance and clean UX in mind.

---

## ✨ Features

- 🔗 **Auto-generate QR** for the current tab URL
- 🖼️ **Embed favicon** inside QR codes
- 🧠 **Local history storage** for previously generated links
- ❌ Clear individual or full QR history
- 📸 **Scan QR** from uploaded images
- 📥 **Download QR** as PNG
- 🧊 Minimal design with smooth UX and loading indicators

---

## 🚀 Installation

### 🧩 Load Unpacked in Chrome

1. Clone this repo
   ```bash
   git clone https://github.com/your-username/qr-scanner.git
   cd qr-code-generator-extension
   ```

2. Build the extension
   ```bash
   npm install
   npm run build
   ```

3. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```

4. Enable **Developer Mode** (top right)
5. Click **"Load unpacked"** and select the `dist/` directory

---

## 🛠️ Tech Stack

- ⚛️ **React** + **TypeScript**
- ✨ **TailwindCSS** for styling
- ⚡ **Vite** for fast builds
- 🧩 **Chrome Extension APIs** (Manifest v3)
- 🎨 [Lucide Icons](https://lucide.dev)
- 📦 `qr-code-styling` for fancy QR rendering

---

## 📋 Permissions

```json
"permissions": ["tabs", "storage", "activeTab"]
```

- `tabs`: Used to fetch current tab's URL and favicon
- `storage`: To persist browsing history
- `activeTab`:  allows your extension temporary access to the currently active tab the user is viewing

---

## 📦 Scripts

```bash
npm install          # Install dependencies
npm run dev          # Start dev server with HMR
npm run build        # Build for production (to dist/)
```

---

## ✅ TODO / Roadmap

- [ ] Export as **SVG**, **PDF**
- [ ] Dynamic QR (editable links)
- [ ] Generate QR from selected text
- [ ] QR types (Wi-Fi, SMS, Social links, etc.)
- [ ] Context menu QR generation
- [ ] Multi-device sync using `chrome.storage.sync`

---

## 📄 License

MIT © [NishchayDixit](https://github.com/NishchayDixit)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

Feel free to check out the [issues](https://github.com/NishchayDixit/qr-scanner/issues) page.

---

> Built with ❤️ to make sharing links easier and smarter.
