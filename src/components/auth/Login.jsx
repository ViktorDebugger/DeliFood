import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useTitle } from "../../hooks/useTitle.jsx";
import { useBackgroundColor } from "../../hooks/useBackgroundColor.jsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.jsx";

const Login = () => {
  useTitle("Вхід");
  useBackgroundColor("bg-blue-500");

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorage("token", "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);
      const idToken = await login(
        emailRef.current.value,
        passwordRef.current.value
      );

      if (idToken) {
        setToken(idToken);
        navigate("/menu");
      } else {
        throw new Error("Не вдалося отримати токен");
      }
    } catch (error) {
      console.error("Помилка входу:", error);
      setError("Не вдалося увійти в систему");
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full rounded-lg bg-white dark:bg-black p-6 shadow-xl"
        data-aos="flip-right"
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-black dark:text-white">
          Вхід
        </h2>
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 dark:bg-red-400 p-4 text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Електронна пошта
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              autoComplete="username"
              className="w-full rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black dark:text-white"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white dark:text-black hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            Увійти
          </button>
        </form>
      </div>
      <div className="mt-4 text-center" data-aos="fade-up">
        <p>Немає облікового запису?</p>
        <div className="mt-2 flex flex-col items-center">
          <Link
            to="/signup"
            className="inline-block w-full md:w-6/10 bg-white dark:bg-black px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 ease-in-out text-blue-500"
          >
            Зареєструватися
          </Link>
          <Link
            to="/menu"
            className="inline-block w-full md:w-6/10 bg-white dark:bg-black px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 ease-in-out text-blue-500 mt-12"
          >
            Повернутись на головну
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
