import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import OrderDish from "./OrderDish.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";

const Order = ({ order, number }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  let timerRef = useRef(null);
  const { markAsReady } = useOrders();

  useEffect(() => {
    const orderEnd = new Date(order.orderEndDatetime);
    const now = new Date();

    if (orderEnd < now) {
      setIsCompleted(true);
      setTimeLeft("00:00");
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = Math.max(0, (orderEnd - now) / 1000);
      const minutes = Math.floor(timeDiff / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(timeDiff % 60)
        .toString()
        .padStart(2, "0");

      const timeString = `${minutes}:${seconds}`;
      setTimeLeft(timeString);

      if (timeString === "00:00" && !isCompleted) {
        markAsReady(order.orderId);
      }
    };

    timerRef.current = setInterval(updateTimer, 1000);
    updateTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [order.orderEndDatetime]);

  return (
    <li className="col-span-1" data-aos="zoom-in">
      <article className="rounded-lg border-4 border-white dark:border-black p-4">
        <header className="flex flex-col items-center justify-between rounded-lg bg-white dark:bg-black px-6 py-2 text-xl md:flex-row lg:text-2xl">
          <h2 className="font-bold text-black dark:text-white">
            Замовлення {number}
          </h2>
          <div className="flex gap-4 sm:gap-16">
            <time className="text-sm text-gray-700 dark:text-gray-500 lg:text-lg">
              {isCompleted ? <FontAwesomeIcon icon={faCheck} /> : timeLeft}
            </time>
            <time className="text-sm text-gray-500 dark:text-gray-300 lg:text-lg">
              {new Date(order.orderStartDatetime).toLocaleString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
              <p></p>
            </time>
          </div>
        </header>

        <ul className="mt-2 grid grid-cols-1 gap-2 rounded-t-lg bg-white dark:bg-black">
          {order.items.map((item) => (
            <OrderDish key={item.id} item={item} orderId={order.orderId} />
          ))}
        </ul>
        <footer className="mx-auto flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-b-lg bg-white dark:bg-black px-8 py-4 text-left md:flex-row text-lg lg:text-xl">
          <div className="flex items-center gap-2">
            <span className="text-black dark:text-white">
              Загальний рахунок
            </span>
            <span className="text-gray-500">$ {order.totalPrice}.00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black dark:text-white">
              Загальна кількість
            </span>
            <span className="h-9 w-9 text-sm md:text-xl rounded-lg bg-gray-300 dark:bg-gray-600 text-black dark:text-white p-1 text-center">
              {order.totalCount}
            </span>
          </div>
        </footer>
      </article>
    </li>
  );
};

export default Order;
