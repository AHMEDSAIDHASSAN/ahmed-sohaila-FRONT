# Ahmed & Sohaila Wedding Invitation

React (Vite) invitation page + Node/Express backend that tracks page opens and
splits them by who shared the link (`?from=ahmed` / `?from=sohaila`), with a
password-protected `/dashboard`.

## Structure

- `client/` — React invitation page (`/`) and dashboard (`/dashboard`)
- `server/` — Express API + SQLite (built-in `node:sqlite`, no native deps)

## Run locally

```bash
# terminal 1
npm run dev:server

# terminal 2
npm run dev:client
```

Open http://localhost:5173. Test tracking links:
- http://localhost:5173/?from=ahmed
- http://localhost:5173/?from=sohaila

Dashboard: http://localhost:5173/dashboard (default admin key: `ahmed-sohaila-2026`
— **change this before going live**, see below).

## Before sending to guests

- `client/src/config.js`: set `MAPS_URL` to the real Google Maps link for the venue.
- `client/src/Invitation.jsx`: set the RSVP button's WhatsApp number (`https://wa.me/...`).
- Set a real admin key: `ADMIN_KEY=your-secret` env var on the server (see below).
- Share two separate links with the families: `https://yourdomain.com/?from=ahmed`
  and `https://yourdomain.com/?from=sohaila` — that's how the dashboard tells opens apart.

## Production build

```bash
npm run build   # builds client/dist and installs server deps
ADMIN_KEY=your-secret PORT=4000 npm start
```

The Express server serves the built React app and the API from one process/port.

## Deploying to a server + domain

This part needs details only you have: which VPS/hosting provider and which
domain registrar/DNS you're using. Once you tell me, I can set it up end-to-end
(e.g. a Node process manager like PM2 behind Nginx with a free Let's Encrypt
SSL cert, or a container on a platform like Railway/Render). In short you'll need:

1. A server (VPS, or a PaaS like Railway/Render/Fly.io) to run `npm start`.
2. `ADMIN_KEY` set as an environment variable there (don't leave the default).
3. Your domain's DNS A/CNAME record pointed at that server.
4. HTTPS (Let's Encrypt via Nginx/Caddy, or automatic on most PaaS).

## Visual assets

`client/public/assets/` holds the PNGs exported from your Figma file (envelope,
monogram, concert card, gramophone, floral divider, date, names/details, dress
code, location pin, footer band). The countdown numbers and the RSVP button are
real HTML/JS on top of them, since those two need to stay live/clickable — everything
else is the exact exported artwork.
