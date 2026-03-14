Deploying to Vercel or Netlify

This project is a Vite + React site. Quick steps:

Vercel
- Connect the GitHub repo to Vercel.
- Build command: `npm run build`
- Output directory: `dist`
- Environment: Node.js (default) — no extra ENV required for static demo.

Netlify
- Connect the GitHub repo to Netlify.
- Build command: `npm run build`
- Publish directory: `dist`

Notes
- The `build` script runs `vite build` and produces a `dist/` folder.
- If you later add server endpoints, move them to a serverless function directory and follow platform docs.
- For local test of production build:

```powershell
npm run build; npm run preview
```
