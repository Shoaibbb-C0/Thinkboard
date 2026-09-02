import { useCategory } from "../context/CategoryContext";

const CategoryTabs = () => {
  const { categories, selectedCategory, selectCategory } =
    useCategory();

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => selectCategory("All")}
        className={`btn btn-sm ${
          selectedCategory === "All"
            ? "btn-primary"
            : "btn-ghost"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => selectCategory(category)}
          className={`btn btn-sm ${
            selectedCategory === category
              ? "btn-primary"
              : "btn-ghost"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
