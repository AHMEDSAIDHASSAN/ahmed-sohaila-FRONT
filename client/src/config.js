export const API_BASE = import.meta.env.VITE_API_BASE || "";
export const WEDDING_DATE_ISO = "2026-08-31T19:00:00+03:00";
export const VENUE_ADDRESS =
  "5WPQ+7CG, El Moaskar, Moharam Bek, Alexandria Governorate 5411450";
export const MAPS_URL = "https://maps.app.goo.gl/HVs7pU8puN1Tmjb86?g_st=aw";

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
