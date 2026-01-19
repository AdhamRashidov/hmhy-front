import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { TUserRole } from "@/types/types";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  userRole: TUserRole | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, role: TUserRole, fullName?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const initialAuthState: AuthContextType = {
  isAuthenticated: false,
  userRole: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(initialAuthState);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedRole = localStorage.getItem("userRole") as TUserRole;

    if (storedToken && storedRole) {
      setAuthState({
        isAuthenticated: true,
        userRole: storedRole,
        token: storedToken,
      });
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, role: TUserRole, fullName?: string) => {
    Cookies.set("token", token, { expires: 7 });
    localStorage.setItem("userRole", role);
    if (fullName) {
      localStorage.setItem("userName", fullName);
    }
    setAuthState({ isAuthenticated: true, userRole: role, token });
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setAuthState({ isAuthenticated: false, userRole: null, token: null });
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    isLoading,
  };

  if (isLoading) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
