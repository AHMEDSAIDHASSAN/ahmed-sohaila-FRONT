import { useEffect, useState } from "react";
import "./Dashboard.css";
import { API_BASE } from "./config";

export default function Dashboard() {
  const [key, setKey] = useState(localStorage.getItem("admin_key") || "");
  const [input, setInput] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const fetchStats = (k) => {
    fetch(`${API_BASE}/api/stats?key=${encodeURIComponent(k)}`)
      .then((r) => {
        if (!r.ok) throw new Error("unauthorized");
        return r.json();
      })
      .then((data) => {
        setStats(data);
        setError("");
      })
      .catch(() => {
        setError("Wrong admin key");
        setStats(null);
      });
  };

  useEffect(() => {
    if (key) fetchStats(key);
  }, [key]);

  useEffect(() => {
    if (!key) return;
    const id = setInterval(() => fetchStats(key), 5000);
    return () => clearInterval(id);
  }, [key]);

  if (!key) {
    return (
      <div className="dash-page">
        <div className="dash-login">
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Admin key"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => {
              localStorage.setItem("admin_key", input);
              setKey(input);
            }}
          >
            Enter
          </button>
          {error && <p className="dash-error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="dash-page">
      <div className="dash-header">
        <h1>Wedding Page Stats</h1>
        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("admin_key");
            setKey("");
            setStats(null);
          }}
        >
          Log out
        </button>
      </div>
      {error && <p className="dash-error">{error}</p>}
      {stats && (
        <>
          <div className="dash-cards">
            <div className="dash-card total">
              <span className="dash-num">{stats.total}</span>
              <span className="dash-label">Total Opens</span>
            </div>
            <div className="dash-card">
              <span className="dash-num">{stats.ahmed}</span>
              <span className="dash-label">From Ahmed's Link</span>
            </div>
            <div className="dash-card">
              <span className="dash-num">{stats.sohaila}</span>
              <span className="dash-label">From Sohaila's Link</span>
            </div>
            <div className="dash-card">
              <span className="dash-num">{stats.other}</span>
              <span className="dash-label">Direct / Other</span>
            </div>
          </div>
          <h3>Recent Visits</h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((r, i) => (
                <tr key={i}>
                  <td>{r.ref}</td>
                  <td>{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>RSVPs ({stats.rsvps.length})</h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Attending</th>
                <th>Message</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {stats.rsvps.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.attending === "yes" ? "✅ Yes" : "❌ No"}</td>
                  <td>{r.message}</td>
                  <td>{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
