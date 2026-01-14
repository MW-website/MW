// Re-export productsApi for convenience
export { productsApi } from "./productApi";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ===== Token helpers =====
function getAuthToken() {
  return localStorage.getItem("mw_auth_token");
}

export function setAuthToken(token) {
  localStorage.setItem("mw_auth_token", token);
}

export function removeAuthToken() {
  localStorage.removeItem("mw_auth_token");
}

// ===== Fetch with auth (EXPORTED) =====
export async function fetchWithAuth(path, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  if (res.status === 401) {
    removeAuthToken();
    throw new Error("UNAUTHORIZED");
  }
  return res;
}

// ===== Orders API =====
export const ordersApi = {
  async createCheckoutSession(items, shippingAddress) {
    const res = await fetchWithAuth("/orders/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ items, shippingAddress }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to create checkout session");
    }
    return res.json();
  },

  async getMyOrders() {
    const res = await fetchWithAuth("/orders/my-orders");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to fetch orders");
    }
    return res.json();
  },

  async getAll() {
    const res = await fetchWithAuth("/orders");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to fetch all orders");
    }
    return res.json();
  },
};

// ===== Auth API =====
export const authApi = {
  async register(email, password, name) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");

    if (data.token) setAuthToken(data.token);
    return data;
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    if (data.token) setAuthToken(data.token);
    return data;
  },

  async getCurrentUser() {
    const res = await fetchWithAuth("/auth/me");
    if (!res.ok) throw new Error("Failed to get user");
    return res.json();
  },

  async updateProfile(updates) {
    const res = await fetchWithAuth("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(updates),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");
    return data;
  },

  logout() {
    removeAuthToken();
  },
};
