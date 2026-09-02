import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CategoryContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    "Personal",
    "College Work",
    "Office",
    "Projects",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/notes/categories`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Keep default categories on error
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        selectedCategory,
        isLoadingCategories,
        selectCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
