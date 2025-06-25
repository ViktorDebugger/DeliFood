import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faBars,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useUrl } from "../hooks/useUrl.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import logoDark from "/logo/logo-dark.png";
import logoLight from "/logo/logo-light.png";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = useUrl();
  const [token, setToken] = useLocalStorage("token", "");
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
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

        if (response.status === 401 || response.status === 403) {
          setToken("");
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Помилка перевірки автентифікації");
        }

        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Помилка перевірки автентифікації:", error);
        setUser(null);
        setIsAuthenticated(false);
        setToken("");
      }
    };

    checkAuth();
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkClasses = (path) => {
    const baseClasses =
      "rounded-lg px-8 py-2 transition duration-300 ease-in-out text-black dark:text-white";
    return `${baseClasses} ${
      isActive(path)
        ? "bg-gray-200 dark:bg-gray-600 font-bold"
        : "hover:bg-gray-200 hover:dark:bg-gray-600"
    }`;
  };

  const getMobileLinkClasses = (path) => {
    const baseClasses =
      "block rounded-lg border w-full text-black dark:text-white border-gray-400 p-4";
    return `${baseClasses} ${
      isActive(path)
        ? "bg-gray-200 dark:bg-gray-600 font-bold"
        : "hover:bg-gray-200 hover:dark:bg-gray-600"
    }`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setToken("");
      setTimeout(() => {
        if (location.pathname === "/menu") {
          window.location.reload();
        } else {
          navigate("/menu");
        }
      }, 700);
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  return (
    <>
      <header
        className="mx-auto my-3 flex h-16 w-full max-w-[1490px] items-center justify-between rounded-lg bg-white dark:bg-black px-8 py-4 shadow-2xl"
        data-aos="fade-down"
      >
        <Link to="/" className="flex items-center h-20 w-24 text-xl">
          <img
            src={theme === "light" ? logoDark : logoLight}
            alt="Логотип"
          />
        </Link>

        <nav className="flex gap-2 lg:gap-8 items-center">
          <ThemeToggle />
          <ul className="hidden items-center gap-2 text-xl md:flex lg:gap-16">
            <li>
              <Link to="/menu" className={getLinkClasses("/menu")}>
                Меню
              </Link>
            </li>
            <li>
              <Link to="/cart" className={getLinkClasses("/cart")}>
                Кошик
              </Link>
            </li>
            {!!user && (
              <li>
                <Link to="/orders" className={getLinkClasses("/orders")}>
                  Мої замовлення
                </Link>
              </li>
            )}

            <li>
              {isAuthenticated ? (
                <button onClick={handleLogout} className={getLinkClasses("")}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              ) : (
                <Link to="/login" className={getLinkClasses("/login")}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setOpenSidebar(true)}
          className="block text-xl text-black dark:text-white md:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      <nav
        className={`fixed right-0 top-0 z-10 h-full w-full transform bg-white dark:bg-black shadow-lg transition-transform duration-300 ${
          openSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between py-6 pl-4 pr-8 text-xl font-bold">
          <ul className="flex w-10/12 flex-col gap-4">
            <li>
              <Link
                to="/menu"
                className={getMobileLinkClasses("/menu")}
                onClick={() => setOpenSidebar(false)}
              >
                Меню
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={getMobileLinkClasses("/cart")}
                onClick={() => setOpenSidebar(false)}
              >
                Кошик
              </Link>
            </li>
            {!!user && (
              <li>
                <Link
                  to="/orders"
                  className={getMobileLinkClasses("/orders")}
                  onClick={() => setOpenSidebar(false)}
                >
                  Мої замовлення
                </Link>
              </li>
            )}
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className={getMobileLinkClasses("")}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span className="ml-4">Вихід</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={getMobileLinkClasses("/login")}
                  onClick={() => {
                    setOpenSidebar(false);
                    handleLogout();
                  }}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span className="ml-4">Вхід</span>
                </Link>
              )}
            </li>
          </ul>
          <button
            onClick={() => setOpenSidebar(false)}
            className="block text-xl text-black dark:text-white"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
