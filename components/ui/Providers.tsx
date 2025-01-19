import AuthProvider from "@/context/AuthContext";
import { AlertProvider } from "@/hooks/useAlert";
import { LoaderProvider } from "@/hooks/useLoader";

const Providers = ({ children }) => {
  return (
    <LoaderProvider>
      <AlertProvider>
        <AuthProvider>{children}</AuthProvider>
      </AlertProvider>
    </LoaderProvider>
  );
};

export default Providers;
