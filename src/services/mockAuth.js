// Mock Authentication Service (works without backend)
// Stores users in localStorage for demo purposes

const USERS_KEY = 'mw_demo_users';
const TOKEN_KEY = 'mw_auth_token';

// Get all users from localStorage
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Generate a simple token
function generateToken(userId) {
  return btoa(`${userId}-${Date.now()}`);
}

// Get user from token
function getUserFromToken(token) {
  try {
    const [userId] = atob(token).split('-');
    const users = getUsers();
    return users.find(u => u.id === userId);
  } catch {
    return null;
  }
}

export const mockAuthApi = {
  async register(email, password, name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        
        // Check if user exists
        if (users.find(u => u.email === email)) {
          reject(new Error('Email already registered'));
          return;
        }

        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          email,
          name,
          password, // In real app, this would be hashed
          role: 'customer',
          cart: [],
          wishlist: [],
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        const token = generateToken(newUser.id);
        localStorage.setItem(TOKEN_KEY, token);

        resolve({
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            cart: newUser.cart,
            wishlist: newUser.wishlist
          },
          token
        });
      }, 500); // Simulate network delay
    });
  },

  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const token = generateToken(user.id);
        localStorage.setItem(TOKEN_KEY, token);

        resolve({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            cart: user.cart || [],
            wishlist: user.wishlist || []
          },
          token
        });
      }, 500);
    });
  },

  async getCurrentUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        
        if (!token) {
          reject(new Error('Not authenticated'));
          return;
        }

        const user = getUserFromToken(token);
        
        if (!user) {
          reject(new Error('Invalid token'));
          return;
        }

        resolve({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            cart: user.cart || [],
            wishlist: user.wishlist || []
          }
        });
      }, 300);
    });
  },

  async updateProfile(updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        
        if (!token) {
          reject(new Error('Not authenticated'));
          return;
        }

        const currentUser = getUserFromToken(token);
        
        if (!currentUser) {
          reject(new Error('User not found'));
          return;
        }

        const users = getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        // Update user
        users[userIndex] = {
          ...users[userIndex],
          ...updates
        };

        saveUsers(users);

        resolve({
          user: {
            id: users[userIndex].id,
            email: users[userIndex].email,
            name: users[userIndex].name,
            role: users[userIndex].role
          }
        });
      }, 300);
    });
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
};

// Create a demo admin account if it doesn't exist
function initializeDemoAccounts() {
  const users = getUsers();
  
  if (!users.find(u => u.email === 'admin@mw.com')) {
    users.push({
      id: 'admin_001',
      email: 'admin@mw.com',
      name: 'Admin User',
      password: 'admin123',
      role: 'admin',
      cart: [],
      wishlist: [],
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
  }
}

// Initialize on load
initializeDemoAccounts();
