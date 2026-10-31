export const API_BASE = import.meta.env.VITE_API_BASE || "";
export const WEDDING_DATE_ISO = "2026-11-06T20:00:00+02:00";
export const VENUE_ADDRESS =
  "Venice Hall, As Soyouf Qebli, Montaza 2, Alexandria Governorate 5515364";
export const MAPS_URL = "https://maps.app.goo.gl/PfujjfJE5QoTfH3G9?g_st=aw";

export function trackVisit(defaultRef) {
  const path = window.location.pathname.replace(/\//g, "");
  const ref =
    path === "ahmed" || path === "sohela"
      ? path.replace("sohela", "sohaila")
      : new URLSearchParams(window.location.search).get("from") || defaultRef || "other";
  fetch(`${API_BASE}/api/visit?ref=${encodeURIComponent(ref)}`, { method: "POST" }).catch(
    () => {}
  );
}
