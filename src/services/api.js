const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem('mw_auth_token');
}

// Set auth token
export function setAuthToken(token) {
  localStorage.setItem('mw_auth_token', token);
}

// Remove auth token
export function removeAuthToken() {
  localStorage.removeItem('mw_auth_token');
}

// Fetch with auth
async function fetchWithAuth(url, options = {}) {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeAuthToken();
    window.location.href = '/login';
  }

  return response;
}

// Auth API
export const authApi = {
  async register(email, password, name) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    if (data.token) {
      setAuthToken(data.token);
    }

    return data;
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    if (data.token) {
      setAuthToken(data.token);
    }

    return data;
  },

  async getCurrentUser() {
    const response = await fetchWithAuth('/auth/me');
    
    if (!response.ok) {
      throw new Error('Failed to get user');
    }

    return await response.json();
  },

  async updateProfile(updates) {
    const response = await fetchWithAuth('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Update failed');
    }

    return data;
  },

  logout() {
    removeAuthToken();
  }
};

// Products API
export const productsApi = {
  async getAll(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/products?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  },

  async checkStock(items) {
    const response = await fetch(`${API_URL}/products/check-stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error('Failed to check stock');
    }

    return await response.json();
  },

  // Admin only
  async create(productData) {
    const response = await fetchWithAuth('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create product');
    }

    return data;
  },

  async update(id, productData) {
    const response = await fetchWithAuth(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update product');
    }

    return data;
  },

  async updateStock(id, quantity, action = 'add', reason = '') {
    const response = await fetchWithAuth(`/products/${id}/stock`, {
      method: 'POST',
      body: JSON.stringify({ quantity, action, reason }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update stock');
    }

    return data;
  },

  async delete(id) {
    const response = await fetchWithAuth(`/products/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete product');
    }

    return data;
  }
};

// Orders API
export const ordersApi = {
  async createCheckoutSession(items, shippingAddress) {
    const response = await fetchWithAuth('/orders/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ items, shippingAddress }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    return data;
  },

  async getMyOrders() {
    const response = await fetchWithAuth('/orders/my-orders');
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  },

  async getById(id) {
    const response = await fetchWithAuth(`/orders/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return await response.json();
  },

  // Admin only
  async getAll(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetchWithAuth(`/orders?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  },

  async updateStatus(id, status, note = '', trackingNumber = '') {
    const response = await fetchWithAuth(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note, trackingNumber }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update order status');
    }

    return data;
  }
};
