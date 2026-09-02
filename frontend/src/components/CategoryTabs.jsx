import { useCategory } from "../context/CategoryContext";

const CategoryTabs = () => {
  const { categories, selectedCategory, selectCategory } =
    useCategory();

  // Get category color (deterministic based on category name)
  const getCategoryColor = (category) => {
    const colors = [
      "from-slate-900 to-slate-800",
      "from-slate-800 to-slate-700",
      "from-slate-700 to-slate-600",
      "from-slate-600 to-slate-500",
      "from-slate-500 to-slate-400",
      "from-slate-400 to-slate-300",
      "from-slate-300 to-slate-200",
    ];
    const hash = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <button
        onClick={() => selectCategory("All")}
        className={`rounded-lg px-4 py-2 font-medium transition-all ${
          selectedCategory === "All"
            ? "bg-base-content text-base-100 shadow-md"
            : "border border-base-content/20 bg-base-100 text-base-content hover:border-base-content/40"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => selectCategory(category)}
          className={`rounded-lg px-4 py-2 font-medium transition-all ${
            selectedCategory === category
              ? `bg-linear-to-r ${getCategoryColor(
                  category
                )} text-white shadow-md`
              : "border border-base-content/20 bg-base-100 text-base-content hover:border-base-content/40"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;


