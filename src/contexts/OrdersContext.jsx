import { createContext, useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = createContext(undefined);

export const OrdersProvider = ({ children }) => {
  const { user } = useAuth();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]); // Додаємо
  const timeoutsRef = useRef({});

  const addOrder = (order) => {
    if (!user) return;
    const newOrders = [...pendingOrders, order];
    const orderNumber = newOrders.length;
    setPendingOrders(newOrders);
    toast.success(`Замовлення ${orderNumber} успішно прийнято в обробку!`);
  };

  const markAsReady = (orderId, showToast = true) => {
    setPendingOrders((prevOrders) => {
      const index = prevOrders.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        const order = prevOrders[index];
        setReadyOrders((prevReady) => [...prevReady, order]); // Додаємо до готових
        if (showToast) {
          toast.success(`Замовлення ${index + 1} готове!`);
        }
      }
      return prevOrders.filter((o) => o.id !== orderId);
    });
  };

  useEffect(() => {
    if (!user) return;

    pendingOrders.forEach((order) => {
      if (timeoutsRef.current[order.id]) return;

      const endTime = new Date(order.orderEndDatetime).getTime();
      const now = Date.now();
      const delay = endTime - now;

      if (delay <= 0) {
        markAsReady(order.id, false);
      } else {
        const tid = setTimeout(() => {
          markAsReady(order.id);
          delete timeoutsRef.current[order.id];
        }, delay);
        timeoutsRef.current[order.id] = tid;
      }
    });

    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
      timeoutsRef.current = {};
    };
  }, [pendingOrders, user]);

  return (
    <OrdersContext.Provider
      value={{ pendingOrders, readyOrders, addOrder, markAsReady }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
};
