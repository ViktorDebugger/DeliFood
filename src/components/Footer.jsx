import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTelegram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mx-auto my-3 w-full max-w-[1490px] rounded-lg bg-white dark:bg-black px-8 py-4 shadow-2xl" data-aos="fade-up">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-between border-b border-gray-300 pb-2 text-xs text-gray-800 dark:text-gray-400 sm:flex-row sm:text-sm md:text-lg">
          <span>+380 934 599 239</span>
          <span>viktor.luka.oi.2023@lpnu.ua</span>
          <span>Лука Віктор</span>
        </div>
        <div className="mt-5 flex flex-col-reverse items-center justify-between md:flex-row">
          <p className="text-gray-500">© 2025 Food. Всі права захищені.</p>
          <div className="flex gap-5 text-3xl">
            <button className="flex h-12 w-12 items-center justify-center rounded-lg transition duration-300 ease-in-out text-black hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600">
              <FontAwesomeIcon icon={faInstagram} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-lg transition duration-300 ease-in-out text-black hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600">
              <FontAwesomeIcon icon={faTelegram} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-lg transition duration-300 ease-in-out text-black hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600">
              <FontAwesomeIcon icon={faTiktok} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
