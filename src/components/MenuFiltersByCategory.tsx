import { MenuCategory } from "@/services/menu/common";
import "../styles/components/ButtonFilter.css";

export type MenuFiltersByCategoryProps = {
  categories: MenuCategory[];
  onFilterByCategory: (category: string) => void;
  onFilterByAll: () => void;
};

export default function MenuFiltersByCategory({
  onFilterByCategory,
  categories,
  onFilterByAll,
}: MenuFiltersByCategoryProps) {
  return (
    <div className="button-filter-div">
      <button
        className="btn"
        type="button"
        data-testid="All-category-filter"
        name="all"
        onClick={onFilterByAll}
      >
        All
      </button>
      {categories.map(({ strCategory }, index) => {
        return (
          <button
            className="btn"
            key={index}
            data-testid={`${strCategory}-category-filter`}
            name={strCategory}
            onClick={() => onFilterByCategory(strCategory)}
          >
            {strCategory}
          </button>
        );
      })}
    </div>
  );
}
