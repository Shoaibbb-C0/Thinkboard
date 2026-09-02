import { useCategory } from "../context/CategoryContext";

const CategoryTabs = () => {
  const { categories, selectedCategory, selectCategory } =
    useCategory();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => selectCategory("All")}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          selectedCategory === "All"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => selectCategory(category)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            selectedCategory === category
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;



