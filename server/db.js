import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "data.json");

function load() {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    if (!data.rsvps) data.rsvps = [];
    return data;
  } catch {
    return { visits: [], rsvps: [] };
  }
}

function save(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data), "utf8");
}

export function logVisit(ref) {
  const clean = ref === "ahmed" || ref === "sohaila" ? ref : "other";
  const data = load();
  data.visits.push({ ref: clean, created_at: new Date().toISOString() });
  save(data);
}

export function addRsvp({ name, attending, message }) {
  const data = load();
  data.rsvps.push({
    name: String(name || "").slice(0, 120),
    attending: attending === "yes" ? "yes" : "no",
    message: String(message || "").slice(0, 1000),
    created_at: new Date().toISOString(),
  });
  save(data);
}

export function getStats() {
  const { visits, rsvps } = load();
  const count = (ref) => visits.filter((v) => v.ref === ref).length;
  const recent = visits.slice(-20).reverse();
  return {
    total: visits.length,
    ahmed: count("ahmed"),
    sohaila: count("sohaila"),
    other: count("other"),
    recent,
    rsvps: rsvps.slice().reverse(),
  };
}
