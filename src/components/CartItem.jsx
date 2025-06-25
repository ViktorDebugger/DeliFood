import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faX } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({
  item,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
}) => {
  return (
    <div className="col-span-1 mx-auto grid w-full grid-cols-2 items-center rounded-lg px-8 py-4 sm:grid-cols-4 bg-white dark:bg-black shadow-2xl duration-300 ease-in-out transition-all scale-100 hover:scale-[1.007]">
      <figure className="col-span-1 overflow-hidden h-16 w-20 rounded-lg shadow-2xl md:w-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      <div className="col-span-1 text-black dark:text-white">
        <h2 className="w-24 truncate text-sm sm:text-base md:w-48 text-left md:text-xl">
          {item.name}
        </h2>
      </div>

      <div className="col-span-1 text-center">
        <p className="text-xl text-gray-500">
          $ {item.price * item.count}.00
        </p>
      </div>

      <div className="col-span-1 flex items-center justify-end gap-2 text-xs sm:text-sm md:text-xl text-black dark:text-white">
        <span>Кількість</span>
        <span className="h-9 w-9 rounded-lg bg-gray-300 dark:bg-gray-600 p-2 text-center md:p-1 text-sm md:text-xl">
          {item.count}
        </span>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => incrementCartItem(item.id)}
            className="rounded-lg bg-gray-300 transition px-1 duration-300 ease-in-out hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </button>

          <button
            onClick={() => deleteCartItem(item.id)}
            className="rounded-lg bg-gray-300 transition px-1 duration-300 ease-in-out hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faX} />
          </button>

          <button
            onClick={() => decrementCartItem(item.id)}
            className="rounded-lg bg-gray-300 transition px-1 duration-300 ease-in-out hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
