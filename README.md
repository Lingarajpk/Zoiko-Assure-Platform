# ZoikoAssure Admin Platform

Glassmorphism admin console for ZoikoAssure, built with Next.js 16 (App Router) and Tailwind CSS v4.
Brand colors: orange `#D58324`, navy `#071C33`.

## Run

```bash
npm install
npm run dev     # http://localhost:3000 → redirects to /login
```

Demo sign-in: any valid email and a password of 6+ characters. This sets a demo cookie that `src/proxy.ts` checks to guard `/dashboard`.

## Structure

- `src/app/login` – login page (brand panel + glass sign-in card)
- `src/app/dashboard` – shell layout, dashboard page, `loading.tsx` skeleton, `[section]` placeholder modules
- `src/components/brand` – logo, check-seal mark, branded loader
- `src/components/layout` – sidebar, topbar (search Ctrl+K, theme toggle, notifications, profile menu)
- `src/components/dashboard` – KPI cards, compliance posture donut, updates, priority actions, activity
- `src/lib/dashboard-data.ts` – demo data (replace with API calls)
- `src/app/globals.css` – theme tokens (dark/light), glass utilities, hover and loading animations
