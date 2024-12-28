import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: { id: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    setTimeout(() => {
      setUser({ id: "1", email });
    }, 1000);
  };
  const login = async (email: string, password: string) => {
    // Simulate API call
    setTimeout(() => {
      setUser({ id: "1", email });
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
