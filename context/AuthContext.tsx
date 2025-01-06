import React, { createContext } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UserInfoType } from "@/types";

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  userInfo: UserInfoType | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, register, login, logout, userInfo } = useAuthContext();
  return (
    <AuthContext.Provider value={{ user, register, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
