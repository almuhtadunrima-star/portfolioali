# portfolioali - Studio Mirage (studiomirage.io) Clone Website

Kloning lengkap dari website studio kreatif ternama **[Studio Mirage](https://studiomirage.io)** (Paris & Dubai), menampilkan pengalaman interaktif 3D WebGL (Three.js), animasi shader, model GLB 3D terkompresi Draco, timeline warna, tipografi custom, dan soundscape audio.

---

## 🚀 Cara Menjalankan

Website ini menggunakan server Node.js ringan (tanpa dependensi eksternal / zero-dependencies) dengan dukungan MIME type lengkap untuk WebAssembly (`.wasm`), 3D Model (`.glb`), font (`.woff2`), dan HTTP Range Request untuk audio/video.

### 1. Jalankan Server Lokal
Buka terminal / PowerShell di folder ini (`studiomirage`), lalu jalankan:

```bash
node server.js
```
atau menggunakan npm:
```bash
npm start
```

### 2. Buka di Browser
Akses link berikut di Google Chrome / Edge / Firefox:
👉 **[http://localhost:8080](http://localhost:8080)**

*(Jika port 8080 sedang digunakan aplikasi lain, server otomatis mencari port berikutnya seperti 8081).*

---

## 📂 Struktur Folder Proyek

```
studiomirage/
├── index.html                     # Halaman utama (Home / 3D Experience)
├── works.html                     # Halaman galeri portfolio / karya
├── about-us.html                  # Halaman profil studio & tim
├── legal-notice.html              # Halaman legal notice
├── works/                         # Halaman detail masing-masing proyek
│   ├── difc/                      # DIFC 4th Edition
│   ├── margiela/                  # Maison Margiela
│   ├── renault-trucks/            # Renault Trucks
│   ├── omnicell-explorer/         # Omnicell Explorer
│   ├── ubisoft/                   # Ubisoft Assassin's Creed
│   ├── tasmim/                    # Tasmim
│   ├── sopra-banking/             # Sopra Banking
│   ├── caisse-des-depots/         # Caisse des Dépôts
│   ├── jinns/                     # Jinns
│   ├── biotherm/                  # Biotherm
│   ├── unpresidential/            # Unpresidential
│   └── metaverse/                 # Metaverse
├── _app/
│   └── immutable/
│       ├── entry/                 # Entry point aplikasi SvelteKit
│       ├── nodes/                 # Komponen halaman (0..5)
│       ├── chunks/                # Logika modul JavaScript & Three.js WebGL
│       └── assets/                # Model 3D (Mirage_scene_03.glb), CSS, Font PPPangramSans
├── draco/
│   └── r182/                      # Draco decoder WebAssembly (.wasm) & JS wrapper
├── color-timelines/               # Data timeline warna tema interaktif (.json & .bin.gz)
├── prismic-assets/                # Thumbnail, audio sfx, dan media video showcase
├── logo-mirage.png                # Logo studio
├── logo-mirage-arabic.svg         # Logo studio kaligrafi Arab
├── server.js                      # Local Web Server (Node.js)
├── package.json                   # Konfigurasi npm scripts
└── README.md                      # Dokumentasi proyek
```

---

## ✨ Fitur & Teknologi yang Terklon

1. **3D Interactive Scene**: Menggunakan Three.js dan model `Mirage_scene_03.Cdl4Dhyd.glb` dengan dekompresi Draco WebAssembly.
2. **Audio & Sound Toggle**: Musik ambient dan sound effect interaktif.
3. **Smooth Scrolling & Motion**: Lenis smooth scroll dan transisi halaman dinamis.
4. **Color Timelines**: Sinkronisasi tema gradien warna dinamis via `color-timelines.bin.gz`.
5. **Clean URL Routing**: Mendukung navigasi langsung seperti `/works`, `/about-us`, dan sub-proyek.
