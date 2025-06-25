import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBackgroundColor } from "../hooks/useBackgroundColor.jsx";
import { useTitle } from "../hooks/useTitle.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useUrl } from "../hooks/useUrl.jsx";
import { toast } from "react-toastify";
import { useOrders } from "../contexts/OrdersContext.jsx";

const Cart = () => {
  useTitle("Кошик");
  useBackgroundColor("bg-yellow-500");

  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const baseUrl = useUrl();
  const { addOrder } = useOrders();

  const makeOrder = async () => {
    try {
      if (!user) {
        toast.error("Потрібно зареєструватись, щоб оформити замовлення!");
        return;
      }

      if (cart.length > 10) {
        toast.error("Неможливо замовити більше ніж 10 страв");
        return;
      }
      const newOrder = {
        items: cart,
        orderStartDatetime: new Date(),
        totalPrice: cart.reduce((acc, cur) => acc + cur.price * cur.count, 0),
        totalCount: cart.reduce((acc, cur) => acc + cur.count, 0),
        orderEndDatetime: new Date(new Date().getTime() + 30 * 300),
      };

      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, order: newOrder }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err);
      }
      
      const { orderId } = await response.json();
      addOrder({ id: orderId, ...newOrder });
      setCart([]);
      setError(null);

      navigate("/orders");
    } catch (error) {
      console.error("Помилка оформлення замовлення:", error);
      setError("Помилка оформлення замовлення");
    }
  };

  const incrementCartItem = (id) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, count: item.count < 100 ? item.count + 1 : item.count }
        : item
    );
    setCart(newCart);
  };

  const decrementCartItem = (id) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, count: item.count > 1 ? item.count - 1 : item.count }
        : item
    );
    setCart(newCart);
  };

  const deleteCartItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <main className="mx-auto w-full flex-grow max-w-[1490px] flex-1 rounded-lg py-4 text-center text-3xl">
      <section
        className="w-full rounded-lg bg-white dark:bg-black text-black dark:text-white py-2 text-3xl"
        data-aos="zoom-in"
      >
        <h1>Кошик</h1>
      </section>

      <motion.section
        className="mt-4 max-w-[1490px] rounded-lg border-4 border-white dark:border-black px-2 py-4 2xl:mx-auto"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <AnimatePresence mode="popLayout">
          <article>
            {error ? (
              <div className="h-96 mt-4 text-white dark:text-black flex items-center justify-center">
                {error}
              </div>
            ) : cart.length ? (
              <motion.div
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.ul
                  layout
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="col-span-1 grid grid-cols-1 gap-2"
                >
                  {cart.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <CartItem
                        key={item.id}
                        item={item}
                        incrementCartItem={incrementCartItem}
                        decrementCartItem={decrementCartItem}
                        deleteCartItem={deleteCartItem}
                      />
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.footer
                  layout
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mx-auto mt-4 flex w-full max-w-[1490px] flex-col items-center justify-between gap-4 rounded-lg bg-white dark:bg-black px-8 py-4 text-left text-sm md:text-lg md:flex-row xl:text-xl"
                >
                  <div className="flex flex-col gap-2 sm:flex-row text-black dark:text-white">
                    <div className="flex items-center gap-2 w-52 md:w-72 xl:w-[340px]">
                      <span>Загальний рахунок</span>
                      <span className="text-gray-500">
                        $
                        {cart.reduce(
                          (accum, cur) => accum + cur.price * cur.count,
                          0
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-black dark:text-white">
                      <span>Загальна кількість</span>
                      <span className="h-9 w-9 rounded-lg bg-gray-300 dark:bg-gray-600 p-1 text-center text-sm md:text-lg">
                        {cart.reduce((accum, cur) => accum + cur.count, 0)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={makeOrder}
                    className="rounded-lg border-2 text-black dark:text-white border-black dark:border-white px-6 py-2 transition duration-300 ease-in-out hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                  >
                    Замовити
                  </button>
                </motion.footer>
              </motion.div>
            ) : (
              <div className="h-[340px] text-white dark:text-black flex items-center justify-center">
                Пусто
              </div>
            )}
          </article>
        </AnimatePresence>
      </motion.section>
    </main>
  );
};

export default Cart;
