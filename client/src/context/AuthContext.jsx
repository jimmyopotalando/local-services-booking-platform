// client/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService, getProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // holds user data
  const [loading, setLoading] = useState(true); // loading state for initial check

  // Load user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile()
        .then((data) => setUser(data))
        .catch(() => {
          logoutService();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    const data = await loginService(credentials);
    setUser(data.user);
    return data;
  };

  // Register function
  const register = async (userData) => {
    const data = await registerService(userData);
    setUser(data.user);
    return data;
  };

  // Logout function
  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
