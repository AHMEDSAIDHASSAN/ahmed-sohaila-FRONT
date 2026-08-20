import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(path.join(__dirname, "data.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export function logVisit(ref) {
  const clean = ref === "ahmed" || ref === "sohaila" ? ref : "other";
  db.prepare("INSERT INTO visits (ref) VALUES (?)").run(clean);
}

export function getStats() {
  const total = db.prepare("SELECT COUNT(*) AS c FROM visits").get().c;
  const ahmed = db.prepare("SELECT COUNT(*) AS c FROM visits WHERE ref = 'ahmed'").get().c;
  const sohaila = db.prepare("SELECT COUNT(*) AS c FROM visits WHERE ref = 'sohaila'").get().c;
  const other = db.prepare("SELECT COUNT(*) AS c FROM visits WHERE ref = 'other'").get().c;
  const recent = db
    .prepare("SELECT ref, created_at FROM visits ORDER BY id DESC LIMIT 20")
    .all();
  return { total, ahmed, sohaila, other, recent };
}

export default db;
