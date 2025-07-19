# 💱 Currency Tracker — Track, Convert & Favorite Exchange Rates in Real-Time!

[![TailwindCSS](https://img.shields.io/badge/Styled_with-TailwindCSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Fixer API](https://img.shields.io/badge/API-Fixer-blue)](https://apilayer.com/marketplace/fixer-api)
[![Status](https://img.shields.io/badge/Live-Demo-green)](#)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

---

🔍 Currency Tracker is a sleek, beginner-friendly **React + Tailwind CSS** app that allows users to:
- Convert currencies instantly 🪙
- Track real-time exchange rates via [Fixer API](https://apilayer.com/marketplace/fixer-api) 📊
- Save favorite conversions ❤️
- Toggle between Light and Dark mode 🌗
- Enjoy smooth animations and modern UI 🤩

---

## 🌟 Features

- 🔁 **Live Conversion** — Convert between 170+ currencies in real time
- 💹 **Favorites Section** — Save your most-used currency pairs
- 🌓 **Dark/Light Theme** — One-click toggle with smooth UI transitions
- 💾 **Persistent Storage** — Favorites stored in `localStorage`
- ⚡ **Glassmorphic UI** — Gorgeous responsive layout powered by Tailwind CSS

---

## 🚀 Demo

> Live link: [https://curren-sync-lac.vercel.app/](#)

---

## 🛠️ Tech Stack

| Tech        | Description                         |
|-------------|-------------------------------------|
| React       | UI Components & SPA Logic           |
| TailwindCSS | Modern Utility-first Styling        |
| Fixer API   | Real-time Exchange Rates (via API Layer) |
| localStorage| Persistent Favorites                |

---
src/
├── components/
│   ├── Converter.jsx
│   ├── Chart.jsx
│   ├── Favorites.jsx
│   └── Insight.jsx
├── App.jsx
├── main.jsx
public/
tailwind.config.js
vite.config.js

---

## 🔧 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/currency-tracker.git
cd currency-tracker

# 2. Install dependencies
npm install

# 3. Add your Fixer API key
# 👉 Create a .env file
echo "VITE_FIXER_API_KEY=your_api_key_here" > .env

# 4. Run the development server
npm run dev
