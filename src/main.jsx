import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { OrdersProvider } from "./contexts/OrdersContext.jsx";

createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </ThemeProvider>
);
