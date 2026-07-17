# Arielle OS

Personal command center: dashboard, calendar, tasks, AI agents, CRM, finance, content studio, brand HQ, and more — scaffolded as a Next.js app.

## Run in GitHub Codespaces (recommended — no local install needed)

1. On this repo's GitHub page, click the green **Code** button → **Codespaces** tab → **Create codespace on main**.
2. Wait for the container to build — it installs dependencies automatically via `.devcontainer/devcontainer.json`.
3. The dev server starts automatically (`npm run dev`) and a preview opens on port 3000. If it doesn't, run:
   ```
   npm run dev
   ```

## Run locally

Requires Node.js 20+.

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

- `src/app` — routes (Next.js App Router). `src/app/page.tsx` is the home dashboard; `src/app/[slug]/page.tsx` renders every other section from `src/data/sections.ts`.
- `src/data/sections.ts` — content/config for every non-home nav section (Calendar, Tasks, AI Agents, CRM, Finance, etc.).
- `src/data/dashboardWidgets.ts` — mock data for the home dashboard widgets.
- `src/components` — Sidebar, TopBar, Card.

This is a scaffold: layout, navigation, and placeholder content for all sections are in place. Integrations (Google/Apple Calendar, Apple Reminders, Fidelity, social platforms) and real data sources are not yet wired up.
