import { createContext, useContext, useState, useEffect } from "react";
import { useUrl } from "../hooks/useUrl";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const baseUrl = useUrl();
  const [token, setToken] = useLocalStorage("token", "");

  const signup = async (email, password) => {
    try {
      const response = await fetch(`${baseUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Помилка реєстрації");
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      toast.success("Реєстрація успішна!");
      return data.token;
    } catch (error) {
      console.error("Помилка реєстрації:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Помилка входу");
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      toast.success("Вхід успішний!");
      return data.token;
    } catch (error) {
      console.error("Помилка входу:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!token) return;

      const response = await fetch(`${baseUrl}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Помилка виходу");
      }
      toast.success("Ви успішно вийшли з системи");
      setToken("");
      setUser(null);
    } catch (error) {
      console.error("Помилка виходу:", error);
      throw error;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Помилка перевірки автентифікації");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Помилка перевірки автентифікації:", error);
        setUser(null);
        setToken("");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
