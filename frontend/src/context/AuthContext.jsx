import React, { createContext, useContext, useState } from 'react';

/**
 * Authentication Context for AgriMart.
 * Provides a frontend-only state structure ready for future FastAPI & JWT integration.
 * DO NOT store real passwords or tokens.
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [demoNotice, setDemoNotice] = useState(null);

  /**
   * Frontend-only demo login logic.
   * Simulates async authentication without real API calls or token storage.
   */
  const loginDemo = async (credentials) => {
    setLoading(true);
    setDemoNotice(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        const notice = 'Demo login successful. Real authentication will be connected to the backend later.';
        setDemoNotice(notice);
        // Set a lightweight demo user profile (no password or sensitive token stored)
        setUser({
          identifier: credentials.identifier,
          name: credentials.identifier.includes('@')
            ? credentials.identifier.split('@')[0]
            : 'Farmer User',
          role: 'Farmer',
          isDemo: true,
        });
        resolve({ success: true, message: notice });
      }, 750);
    });
  };

  /**
   * Frontend-only demo registration logic.
   */
  const registerDemo = async (formData) => {
    setLoading(true);
    setDemoNotice(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        const notice = 'Demo registration successful. Your account will be created when backend authentication is connected.';
        setDemoNotice(notice);
        setUser({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          location: `${formData.village}, ${formData.mandal}, ${formData.district}, ${formData.state}`,
          isDemo: true,
        });
        resolve({ success: true, message: notice });
      }, 850);
    });
  };

  /**
   * Frontend-only demo forgot password request.
   */
  const forgotPasswordDemo = async (identifier) => {
    setLoading(true);
    setDemoNotice(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        const notice = 'Demo reset request submitted. Password recovery will be connected to the backend later.';
        setDemoNotice(notice);
        resolve({ success: true, message: notice });
      }, 700);
    });
  };

  /**
   * Demo logout function.
   */
  const logoutDemo = () => {
    setUser(null);
    setDemoNotice(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        demoNotice,
        loginDemo,
        registerDemo,
        forgotPasswordDemo,
        logoutDemo,
        setDemoNotice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
