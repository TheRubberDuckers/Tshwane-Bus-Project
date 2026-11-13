const BASE = "http://13.246.131.118/api";
const KEY = "tshwane_token";

export const tokenStore = {
  get: () => localStorage.getItem(KEY),
  set: (t) => localStorage.setItem(KEY, t),
  clear: () => localStorage.removeItem(KEY),
};

function formatErrors(data) {
  if (!data || typeof data !== "object") return null;
  return Object.entries(data)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(" ") : JSON.stringify(v)}`)
    .join("\n");
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = tokenStore.get();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch {
    throw new Error("Can't reach the server. Check that the backend is running.");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && auth) tokenStore.clear();
    const err = new Error(data?.detail || formatErrors(data) || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  login: (username, password) => request("/auth/login/", { method: "POST", body: { username, password }, auth: false }),
  me: () => request("/auth/me/"),
  listRoutes: () => request("/routes/", { auth: false }),
  createRoute: (r) => request("/routes/", { method: "POST", body: r }),
  updateRoute: (id, r) => request(`/routes/${id}/`, { method: "PUT", body: r }),
  deleteRoute: (id) => request(`/routes/${id}/`, { method: "DELETE" }),
};
