import React, { createContext, useState, useContext, ReactNode } from "react";

interface AlertContextType {
  showAlert: (message: string) => void;
  message: string;
  onClose: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [message, setMessage] = useState("");

  const showAlert = (alertMessage: string) => {
    setMessage(alertMessage);
  };

  const onClose = () => {
    setMessage("");
  };
  return (
    <AlertContext.Provider value={{ message, showAlert, onClose }}>
      {children}
    </AlertContext.Provider>
  );
};
