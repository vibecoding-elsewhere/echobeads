# Elsewhere — Setup Guide

## Folder Structure

```
elsewhere/
├── index.html
├── vite.config.js
├── package.json
├── .env.example          ← copy to .env and fill in Supabase keys
├── supabase_schema.sql   ← run this in Supabase SQL editor once
└── src/
    ├── main.jsx           ← entry point
    ├── App.jsx            ← router
    ├── lib/
    │   ├── supabase.js    ← Supabase client (Model)
    │   └── affirmations.js ← 100 quotes data
    ├── hooks/             ← Controller logic
    │   ├── useAffirmation.js
    │   ├── useNotes.js
    │   └── useCommunity.js
    ├── styles/
    │   └── global.css
    └── components/        ← Views
        ├── layout/
        │   ├── Header.jsx + .module.css
        │   └── BottomNav.jsx + .module.css
        ├── echo/
        │   └── EchoPage.jsx + .module.css
        ├── reflect/
        │   └── ReflectPage.jsx + .module.css
        ├── community/
        │   └── CommunityPage.jsx + .module.css
        └── mynotes/
            └── MyNotesPage.jsx + .module.css
```

---

## Step 1 — Install Node.js (if you haven't)

Go to https://nodejs.org and download the LTS version.

---

## Step 2 — Set up Supabase

1. Go to https://supabase.com and create a free account
2. Click **New Project** — name it `elsewhere`
3. Go to **SQL Editor** → paste the contents of `supabase_schema.sql` → click Run
4. Go to **Settings → API**
5. Copy your **Project URL** and **anon public key**

---

## Step 3 — Configure environment

1. In the project folder, duplicate `.env.example` and rename it `.env`
2. Fill in your keys:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Step 4 — Install and run

Open Terminal, navigate to the project folder, then:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Step 5 — Deploy to Vercel (free)

1. Push the project to GitHub
2. Go to https://vercel.com → Import your repo
3. Add your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) in Vercel's settings
4. Deploy — your site is live

---

## MVC Mapping

| Layer      | What it is                          |
|------------|-------------------------------------|
| Model      | Supabase tables + RLS policies      |
| Controller | Custom hooks in `src/hooks/`        |
| View       | React components in `src/components/` |
