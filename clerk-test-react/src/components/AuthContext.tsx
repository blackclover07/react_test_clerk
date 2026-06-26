import { createContext, useContext, useState } from "react";

interface AuthContextType {
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useRole must be used inside AuthProvider");
  }

  return context;
};
