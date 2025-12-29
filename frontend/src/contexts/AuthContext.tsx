import { createContext, useContext, useState,  type ReactNode } from "react";

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { fullName: string; email: string; phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAddresses: Address[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    phone: "0912 345 678",
    address: "123 Nguyễn Huệ",
    city: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé",
    isDefault: true,
  },
  {
    id: "2",
    name: "Nguyễn Văn A",
    phone: "0912 345 679",
    address: "456 Lê Lợi",
    city: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Thành",
    isDefault: false,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json && json.success && json.data?.user) {
        const u = json.data.user;
        setUser({
          id: u.id || u._id || '1',
          fullName: ((u.firstName || '') + ' ' + (u.lastName || '')).trim() || u.fullName || email,
          email: u.email || email,
          phone: u.phone || '',
          addresses: u.addresses || [],
        });
        return true;
      }

      // Fallback to local mock if backend doesn't return user (compatibility)
      await new Promise(resolve => setTimeout(resolve, 250));
      if (email && password) {
        setUser({
          id: '1',
          fullName: 'Người dùng',
          email,
          phone: '',
          addresses: mockAddresses,
        });
        return true;
      }
      return false;
    } catch (err) {
      // network error -> fallback to mock
      await new Promise(resolve => setTimeout(resolve, 250));
      if (email && password) {
        setUser({
          id: '1',
          fullName: 'Người dùng',
          email,
          phone: '',
          addresses: mockAddresses,
        });
        return true;
      }
      return false;
    }
  };

  const register = async (data: { fullName: string; email: string; phone: string; password: string }): Promise<boolean> => {
    // prepare payload: split fullName into firstName / lastName
    const parts = data.fullName.trim().split(/\s+/);
    const firstName = parts.slice(0, -1).join(' ') || parts[0] || data.fullName;
    const lastName = parts.length > 1 ? parts.slice(-1).join(' ') : '';

    const payload = {
      firstName,
      lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
    } as any;

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json && json.success && json.data?.user) {
        const u = json.data.user;
        setUser({
          id: u.id || u._id || '1',
          fullName: ((u.firstName || firstName) + ' ' + (u.lastName || lastName)).trim(),
          email: u.email || data.email,
          phone: u.phone || data.phone || '',
          addresses: u.addresses || [],
        });
        return true;
      }

      // fallback to mock
      setUser({
        id: '1',
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        addresses: [],
      });
      return true;
    } catch (err) {
      // network error: fallback to mock
      setUser({
        id: '1',
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        addresses: [],
      });
      return true;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const addAddress = (address: Omit<Address, "id">) => {
    if (user) {
      const newAddress = { ...address, id: Date.now().toString() };
      const addresses = address.isDefault 
        ? user.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress)
        : [...user.addresses, newAddress];
      setUser({ ...user, addresses });
    }
  };

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    if (user) {
      const addresses = user.addresses.map(a => 
        a.id === id ? { ...a, ...addressData } : a
      );
      setUser({ ...user, addresses });
    }
  };

  const deleteAddress = (id: string) => {
    if (user) {
      setUser({ ...user, addresses: user.addresses.filter(a => a.id !== id) });
    }
  };

  const setDefaultAddress = (id: string) => {
    if (user) {
      const addresses = user.addresses.map(a => ({
        ...a,
        isDefault: a.id === id,
      }));
      setUser({ ...user, addresses });
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock - in real app, validate old password and update
    return oldPassword.length > 0 && newPassword.length >= 6;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      changePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
