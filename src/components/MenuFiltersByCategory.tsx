import { MenuCategory } from "@/services/menu/common";
import "@/sass/components/_menuFiltersByCategory.scss";
import { leftArrowIcon, rightArrowIcon } from "@/assets/icons";
import { useRef } from "react";
import { useLinearScroll } from "@/hooks";

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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { isAtEnd, isAtStart, scrollTo } = useLinearScroll(scrollerRef);

  return (
    <div className="filters">
      {!isAtStart && (
        <div className="filter-arrow-left">
          <button onClick={() => scrollTo("left")}>
            <img src={leftArrowIcon} alt="arrow to the left" />
          </button>
        </div>
      )}

      <div className="filters-scroller snaps-inline" ref={scrollerRef}>
        <button
          type="button"
          data-testid="All-category-filter"
          name="all"
          className="filter-button"
          onClick={onFilterByAll}
        >
          All
        </button>
        {categories.map(({ strCategory }, index) => {
          return (
            <button
              className="filter-button"
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

      {!isAtEnd && (
        <div className="filter-arrow-right">
          <button onClick={() => scrollTo("right")}>
            <img src={rightArrowIcon} alt="arrow to the right" />
          </button>
        </div>
      )}
    </div>
  );
}
