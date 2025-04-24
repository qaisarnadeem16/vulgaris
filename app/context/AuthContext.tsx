"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, token: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedEmail = localStorage.getItem("userEmail");
      if (storedToken && storedEmail) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/auth/user/${storedEmail}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, token: string): Promise<boolean> => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);
      setToken(token);

      const response = await fetch(
        `http://localhost:8000/api/auth/user/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return true;
      } else {
        const newUser = {
          _id: "temp-id",
          email,
          username: email.split("@")[0],
        };
        setUser(newUser);
        return true;
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  const checkAuth = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return false;

    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/check-token`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
