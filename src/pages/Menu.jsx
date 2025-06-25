import { useState, useEffect } from "react";
import { useBackgroundColor } from "../hooks/useBackgroundColor.jsx";
import { useTitle } from "../hooks/useTitle.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import DishCard from "../components/DishCard.jsx";
import CategorySelect from "../components/CategorySelect.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Pagination from "../components/Pagination.jsx";
import { PulseLoader } from "react-spinners";
import { useUrl } from "../hooks/useUrl.jsx";

const Menu = () => {
  useBackgroundColor("bg-orange-500");
  useTitle("Меню");

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [dishes, setDishes] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const { cart, setCart } = useCart();
  const { theme } = useTheme();
  const baseUrl = useUrl();

  useEffect(() => {
    const fetchDishes = async () => {
      setIsloading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/api/dishes`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Неправильний формат відповіді від сервера");
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Помилка при отриманні страв");
        }

        const data = await response.json();
        setDishesData(data || []);
      } catch (error) {
        console.error("Помилка при отриманні страв: ", error);
        setError("Помилка при отриманні страв");
      } finally {
        setIsloading(false);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    setFilteredDishes(dishesData);
    setDishes(dishesData.slice(0, itemsPerPage) || []);
  }, [dishesData]);

  useEffect(() => {
    updateDishes();
  }, [selectCategory]);

  const updateDishes = () => {
    if (!dishesData) return;

    const filtered = dishesData.filter(
      (dish) =>
        dish.name.toLowerCase().includes(inputSearch.toLowerCase()) &&
        (selectCategory ? dish.category === selectCategory : true)
    );
    setFilteredDishes(filtered);
    setCurrentPage(1);
    setDishes(filtered.slice(0, itemsPerPage));
  };

  const handleSelect = (value) => {
    setSelectCategory(value);
  };

  const AddToCart = async (dishId) => {
    const selectedDish = dishes.find((dish) => dish.id === dishId);
    if (selectedDish) {
      const newCart = [...cart, { ...selectedDish, count: 1 }];
      setCart(newCart || []);
    }
  };

  const isInCart = (dishName) => {
    return (cart || []).some((item) => item.name === dishName);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDishes(filteredDishes.slice(start, end) || []);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
  return (
    <main className="mx-auto py-4 flex-grow w-full max-w-[1490px] flex-1 rounded-lg text-center text-xl">
      <section
        className="w-full rounded-lg bg-white dark:bg-black text-black dark:text-white py-2 text-3xl"
        data-aos="zoom-in"
      >
        <h1>Меню</h1>
      </section>

      <section
        className="mt-4 flex max-w-[1490px] flex-col items-center justify-between gap-2 rounded-lg bg-white dark:bg-black px-2 py-4 md:flex-row 2xl:mx-auto"
        data-aos="fade-up"
      >
        <CategorySelect value={selectCategory} onChange={handleSelect} />
        <SearchInput
          value={inputSearch}
          onChange={setInputSearch}
          onSearch={updateDishes}
        />
      </section>

      <section>
        {isLoading ? (
          <div className="h-96 mt-4 text-white dark:text-black border-4 border-white dark:border-black rounded-lg flex items-center justify-center">
            <PulseLoader
              color={theme === "dark" ? "black" : "white"}
              size={15}
              speedMultiplier={1}
            />
          </div>
        ) : error ? (
          <div className="h-96 mt-4 text-white dark:text-black border-4 border-white dark:border-black rounded-lg flex items-center justify-center">
            {error}
          </div>
        ) : dishes?.length ? (
          <ul className="mt-4 grid max-w-[1490px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:mx-auto">
            {dishes.map((item) => (
              <DishCard
                key={item.id}
                dish={item}
                AddToCart={AddToCart}
                isInCart={isInCart}
              />
            ))}
          </ul>
        ) : (
          <div className="h-96 mt-4 text-white border-4 border-white rounded-lg flex items-center justify-center">
            Пусто
          </div>
        )}
      </section>

      {!isLoading && dishes?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default Menu;
