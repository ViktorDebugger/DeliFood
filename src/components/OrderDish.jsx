import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useUrl } from "../hooks/useUrl.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage";

const OrderDish = ({ item, orderId }) => {
  const { user } = useAuth();
  const [grade, setGrade] = useState(item.grade || 0);
  const [hoverGrade, setHoverGrade] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [token, _] = useLocalStorage("token", "");
  const baseUrl = useUrl();

  const handleGrade = async (value) => {
    setIsUpdating(true);
    try {
      const res = await fetch(
        `${baseUrl}/api/orders/${user.uid}/${orderId}/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ grade: value }),
        }
      );
      if (!res.ok) throw new Error();
      setGrade(value);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li className="mx-auto w-full rounded-lg border-b-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black px-8 py-4 duration-300 ease-in-out transition-all scale-100 hover:scale-[1.007]">
      <section className="grid grid-cols-2 sm:grid-cols-4 items-center">
        <figure className="col-span-1 h-16 w-18 shadow-2xl md:w-24">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center rounded-lg"
          />
        </figure>
        <div className="col-span-1">
          <h2 className="w-24 truncate text-right text-sm md:w-48 md:text-left md:text-xl text-black dark:text-white">
            {item.name}
          </h2>
        </div>
        <div className="col-span-1 mt-4 sm:mt-0">
          <p className="text-lg text-gray-500">
            $ {item.price * item.count}.00
          </p>
        </div>
        <div className="col-span-1 mt-4 sm:mt-0 flex items-center justify-end gap-2 text-sm md:text-xl">
          <span className="text-black dark:text-white">Кількість</span>
          <span className="h-9 w-9 rounded-lg bg-gray-300 dark:bg-gray-600 text-black dark:text-white p-2 text-center md:p-1">
            {item.count}
          </span>
        </div>
      </section>

      <footer className="flex items-center justify-center gap-2">
        <span className="text-sm md:text-base">Оцінка</span>
        <div
          className="flex gap-1 items-center"
          onMouseLeave={() => setHoverGrade(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverGrade(star)}
              onClick={() => handleGrade(star)}
              disabled={isUpdating}
              className={`text-2xl transition-colors duration-200 ${
                star <= (hoverGrade || grade)
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-500"
              } ${
                isUpdating ? "opacity-20 cursor-wait" : "hover:text-yellow-400"
              }`}
            >
              ⟡
            </button>
          ))}
        </div>
      </footer>
    </li>
  );
};

export default OrderDish;
