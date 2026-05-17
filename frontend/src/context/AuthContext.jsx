import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Persist token in localStorage so refreshing the page keeps you logged in
  const [token, setToken] = useState(() => localStorage.getItem("sed_token"));

  function login(newToken) {
    localStorage.setItem("sed_token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("sed_token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
