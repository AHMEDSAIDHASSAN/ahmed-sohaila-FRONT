import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "data.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch {
    return { visits: [] };
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

export function getStats() {
  const { visits } = load();
  const count = (ref) => visits.filter((v) => v.ref === ref).length;
  const recent = visits.slice(-20).reverse();
  return {
    total: visits.length,
    ahmed: count("ahmed"),
    sohaila: count("sohaila"),
    other: count("other"),
    recent,
  };
}
