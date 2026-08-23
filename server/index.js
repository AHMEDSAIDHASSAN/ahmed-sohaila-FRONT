import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { logVisit, addRsvp, getStats } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const ADMIN_KEY = process.env.ADMIN_KEY || "ahmed-sohaila-2026";
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/api/visit", (req, res) => {
  const ref = (req.query.ref || req.body?.ref || "other").toString();
  logVisit(ref);
  res.json({ ok: true });
});

app.post("/api/rsvp", (req, res) => {
  const { name, attending, message } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "name is required" });
  }
  addRsvp({ name, attending, message });
  res.json({ ok: true });
});

app.get("/api/stats", (req, res) => {
  const key = req.query.key || req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) return res.status(401).json({ error: "unauthorized" });
  res.json(getStats());
});

const clientDist = path.join(__dirname, "..", "client", "dist");

const SITE_URL = process.env.SITE_URL || "https://ahmed-sohaila.pevidea.com";

const PAGE_META = {
  ahmed: {
    title: "Ahmed & Sohaila — You're Invited",
    description: "Join us to celebrate our wedding on 31 August 2026.",
    image: "/assets/og-groom.png",
  },
  sohela: {
    title: "Ahmed & Sohaila — You're Invited",
    description: "Join us to celebrate our wedding on 31 August 2026.",
    image: "/assets/og-bride.png",
  },
  default: {
    title: "Ahmed & Sohaila — You're Invited",
    description: "Join us to celebrate our wedding on 31 August 2026.",
    image: "/assets/og-bride.png",
  },
};

function metaTags(meta, url) {
  return `
    <meta name="description" content="${meta.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${SITE_URL}${meta.image}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${SITE_URL}${meta.image}" />
  `;
}

let indexHtmlCache = null;
function loadIndexHtml() {
  if (!indexHtmlCache || process.env.NODE_ENV !== "production") {
    indexHtmlCache = fs.readFileSync(path.join(clientDist, "index.html"), "utf8");
  }
  return indexHtmlCache;
}

app.use(express.static(clientDist, { index: false }));

app.get(["/", "/ahmed", "/sohela"], (req, res) => {
  const key = req.path.replace(/\//g, "") || "default";
  const meta = PAGE_META[key] || PAGE_META.default;
  const html = loadIndexHtml()
    .replace("<title>Ahmed & Sohaila Wedding</title>", `<title>${meta.title}</title>`)
    .replace("<!--OG_META-->", metaTags(meta, `${SITE_URL}${req.path}`));
  res.set("Content-Type", "text/html").send(html);
});

app.use((req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
