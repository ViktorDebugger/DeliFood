import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex w-full sm:w-8/10 justify-end gap-2 md:w-[35%]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Пошук..."
        className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 text-gray-700 dark:text-gray-300 focus:border-gray-400 dark:focus:border-gray-700 focus:outline-none"
      />
      <button
        onClick={onSearch}
        className="h-12 w-12 rounded-lg text-black dark:text-white bg-gray-300 dark:bg-gray-600 p-2 transition duration-300 ease-in-out hover:bg-gray-400 hover:dark:bg-gray-700"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchInput;
