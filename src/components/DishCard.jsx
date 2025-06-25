const DishCard = ({ dish, AddToCart, isInCart }) => {
  return (
    <li
      className="w-full max-w-[350px] col-span-1 mx-auto h-[500px] rounded-lg bg-white dark:bg-black shadow-2xl duration-300 ease-in-out transition-all hover:bg-red-100 scale-100 hover:scale-[1.01]"
    >
      <figure className="mx-auto w-10/12 h-52 overflow-hidden rounded-lg shadow-2xl">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      <div className="p-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {dish.name}
        </h2>
        <p className="mt-4 text-xl text-gray-500">Категорія: {dish.category}</p>
        <div className="h-32">
          <p className="mt-3 text-lg text-gray-800 dark:text-white/80 md:text-xl">
            {dish.description}
          </p>
        </div>

        <button
          onClick={() => AddToCart(dish.id)}
          className="disabled:bg-gray-500 disabled:border-gray-500 disabled:text-white dark:disabled:text-black rounded-lg border-2 border-green-600 px-2 py-2 text-green-600 transition duration-300 ease-in-out hover:bg-green-600 hover:text-white dark:hover:text-black w-full"
          disabled={isInCart(dish.name)}
        >
          {isInCart(dish.name)
            ? "У кошику"
            : `Додати у кошик: $ ${dish.price}.00`}
        </button>
      </div>
    </li>
  );
};

export default DishCard;
