import { createContext, useContext, useState, type ReactNode } from "react";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: "admin" | "moderator";
}

interface AdminContextType {
  admin: Admin | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock admin credentials (in real app, this would be server-side validated)
const MOCK_ADMINS = [
  { id: "1", email: "admin@apple.vn", password: "admin123", name: "Admin", role: "admin" as const },
  { id: "2", email: "mod@apple.vn", password: "mod123", name: "Moderator", role: "moderator" as const },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : null;
  });

  const isAdminAuthenticated = !!admin;

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    const found = MOCK_ADMINS.find((a) => a.email === email && a.password === password);
    if (found) {
      const adminData = { id: found.id, email: found.email, name: found.name, role: found.role };
      setAdmin(adminData);
      localStorage.setItem("admin", JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  return (
    <AdminContext.Provider value={{ admin, isAdminAuthenticated, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
