import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext.jsx";
import Layout from "./Layout.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/signup"
          element={
            <div className="w-full flex justify-center items-center min-h-screen px-4">
              <div className="w-full max-w-sm mx-auto p-8">
                <Signup />
              </div>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="w-full flex justify-center items-center min-h-screen px-4">
              <div className="w-full max-w-sm mx-auto p-8">
                <Login />
              </div>
            </div>
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        icon={false}
        rtl={false}
        toastClassName={({ type }) =>
          type === "success"
            ? `bg-green-500 border-4 border-green-700 text-white ${
                theme === "dark"
                  ? "dark:bg-green-700 dark:border-green-900 dark:text-black"
                  : ""
              }`
            : `bg-red-500 border-4 border-red-700 text-white ${
                theme === "dark"
                  ? "dark:bg-red-700 dark:border-red-900 dark:text-black"
                  : ""
              }`
        }
        toastStyle={{
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      />
    </Router>
  );
}

export default App;
