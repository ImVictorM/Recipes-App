import { RecipeCategory } from "@/services/menu/common";
import { arrowLeftIcon, arrowRightIcon } from "@/assets/icons";
import { useRef } from "react";
import { useScrollLinearManual } from "@/hooks";
import styles from "@/sass/pages/Recipes/components/RecipesFilterByCategory.module.scss";
import { ScrollLinearContainer } from "@/components";

export type RecipesFilterByCategoryProps = {
  categories: RecipeCategory[];
  onFilterByCategory: (category: string) => void;
  onFilterByAll: () => void;
};

export default function RecipesFilterByCategory({
  onFilterByCategory,
  categories,
  onFilterByAll,
}: RecipesFilterByCategoryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { isAtEnd, isAtStart, scrollTo } = useScrollLinearManual(scrollerRef);

  return (
    <div className={`${styles.filters}`}>
      {!isAtStart && (
        <div className={`${styles["filters__arrow-left"]}`}>
          <button onClick={() => scrollTo("left")}>
            <img src={arrowLeftIcon} alt="arrow to the left" />
          </button>
        </div>
      )}

      <ScrollLinearContainer
        className={`
        ${styles.filters__scroller} hide-scroll`}
        ref={scrollerRef}
        as="div"
      >
        <button
          type="button"
          data-testid="All-category-filter"
          name="all"
          className={`${styles.filter__scroller__button}`}
          onClick={onFilterByAll}
        >
          All
        </button>
        {categories.map(({ strCategory }, index) => {
          return (
            <button
              className={`${styles.filter__scroller__button}`}
              key={index}
              data-testid={`${strCategory}-category-filter`}
              name={strCategory}
              onClick={() => onFilterByCategory(strCategory)}
            >
              {strCategory}
            </button>
          );
        })}
      </ScrollLinearContainer>

      {!isAtEnd && (
        <div className={`${styles["filters__arrow-right"]}`}>
          <button onClick={() => scrollTo("right")}>
            <img src={arrowRightIcon} alt="arrow to the right" />
          </button>
        </div>
      )}
    </div>
  );
}
