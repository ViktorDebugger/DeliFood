import { useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle.jsx";
import { useBackgroundColor } from "../hooks/useBackgroundColor.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import Order from "../components/Order.jsx";
import { PulseLoader } from "react-spinners";
import { useUrl } from "../hooks/useUrl.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Orders = () => {
  useTitle("Замовлення");
  useBackgroundColor("bg-green-500");

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const baseUrl = useUrl();
  const [token, _] = useLocalStorage("token", "");

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/api/orders/${user?.uid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Помилка при завантаженні замовлень");
        }
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Помилка при завантаженні замовлень");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.uid && token) {
      fetchOrders();
    }
  }, [user]);

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.orderStartDatetime) - new Date(a.orderStartDatetime)
  );

  return (
    <main className="mx-auto w-full flex-grow max-w-[1490px] flex-1 rounded-lg py-4 text-center text-3xl">
      <section
        className="w-full rounded-lg bg-white dark:bg-black text-black dark:text-white py-2 text-3xl"
        data-aos="zoom-in"
      >
        <h1>Замовлення</h1>
      </section>

      <section className="mt-4 max-w-[1490px] 2xl:mx-auto">
        {isLoading ? (
          <div className="h-96 mt-4 border-4 border-white dark:border-black rounded-lg text-white dark:text-black text-xl flex items-center justify-center">
            <PulseLoader
              color={theme === "dark" ? "black" : "white"}
              size={15}
              speedMultiplier={1}
            />
          </div>
        ) : error ? (
          <div className="h-[340px] text-white dark:text-black border-4 border-white dark:border-black rounded-lg flex items-center justify-center">
            {error}
          </div>
        ) : orders.length ? (
          <ul className="grid grid-cols-1 gap-2">
            {sortedOrders.map((order, index) => (
              <Order
                key={order.orderId}
                order={{ ...order, userId: user?.uid }}
                number={sortedOrders.length - index}
              />
            ))}
          </ul>
        ) : (
          <div className="h-[340px] text-white dark:text-black border-4 border-white dark:border-black rounded-lg flex items-center justify-center">
            Пусто
          </div>
        )}
      </section>
    </main>
  );
};

export default Orders;
