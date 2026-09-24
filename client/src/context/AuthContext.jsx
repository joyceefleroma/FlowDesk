import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('flowdesk_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('flowdesk_token');
      if (savedToken) {
        try {
          const res = await authService.getMe();
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('flowdesk_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.warn('[Auth] Session initialization failed:', err.message);
          localStorage.removeItem('flowdesk_token');
          localStorage.removeItem('flowdesk_user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.success && res.data) {
      const { user: userData, token: jwtToken } = res.data;
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('flowdesk_token', jwtToken);
      localStorage.setItem('flowdesk_user', JSON.stringify(userData));
      return userData;
    }
  };

  const register = async (name, email, password, timezone) => {
    const res = await authService.register({ name, email, password, timezone });
    if (res.success && res.data) {
      const { user: userData, token: jwtToken } = res.data;
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem('flowdesk_token', jwtToken);
      localStorage.setItem('flowdesk_user', JSON.stringify(userData));
      return userData;
    }
  };

  const updateProfile = async (updateData) => {
    const res = await authService.updateProfile(updateData);
    if (res.success && res.data) {
      setUser(res.data);
      localStorage.setItem('flowdesk_user', JSON.stringify(res.data));
      return res.data;
    }
  };

  const logout = () => {
    try {
      authService.logout().catch(() => {});
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('flowdesk_token');
      localStorage.removeItem('flowdesk_user');
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
