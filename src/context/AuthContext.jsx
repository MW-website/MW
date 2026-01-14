import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi, fetchWithAuth } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("mw_auth_token");
    if (!token) {
      setLoading(false); // guest, move on
      return;
    }
    fetchWithAuth("/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user || null))
      .catch(() => {
        localStorage.removeItem("mw_auth_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name) => {
    const data = await authApi.register(email, password, name);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const updateUser = async (updates) => {
    const data = await authApi.updateProfile(updates);
    setUser(data.user);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
