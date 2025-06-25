import { useTitle } from "../hooks/useTitle";
import { useBackgroundColor } from "../hooks/useBackgroundColor.jsx";

const NotFound = () => {
  useTitle("Не знайдено");
  useBackgroundColor("bg-gray-500");

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center flex flex-col justify-center h-[60vh]">
        <h1 className="text-4xl font-bold mb-4 text-white dark:text-black">404</h1>
        <p className="text-xl mb-4 text-white dark:text-black">Сторінку не знайдено</p>
        <button
          onClick={() => (window.location.href = "/menu")}
          className="bg-blue-500 text-white px-4 py-2 rounded dark:text-black hover:bg-blue-600"
        >
          Повернутися на головну
        </button>
      </div>
    </div>
  );
};

export default NotFound;
