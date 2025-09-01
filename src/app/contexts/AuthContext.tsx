"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType, User } from "../library/types/auth"; // ✅ Fixed import path


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Add useEffect to check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authCredentials = localStorage.getItem("authCredentials");

        if (authCredentials) {
          // Check if stored credentials are still valid
          const response = await fetch("/api/auth/whoami", {
            // We'll create this endpoint
            headers: {
              Authorization: `Basic ${authCredentials}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            // Invalid credentials, clear them
            localStorage.removeItem("authCredentials");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authCredentials");
      } finally {
        setLoading(false); // ✅ Always set loading to false when done
      }
    };

    checkAuth();
  }, []);

  // ✅ Update login function to manage loading
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true); // ✅ Set loading when login starts

    try {
      const response = await fetch("/api/auth/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Username": username,
          "X-Password": password,
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authCredentials", data.authCredentials);
        setUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false); // ✅ Always set loading to false when done
    }
  };

  // ✅ Add logout function
  const logout = () => {
    localStorage.removeItem("authCredentials");
    setUser(null);
    window.location.href = "/login";
  };

  // ✅ Create the value object to pass to provider
  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
