import express from "express";
import cors from "cors";
import path from "node:path";
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
app.use(express.static(clientDist));
app.use((req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
