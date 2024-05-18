import { useState, useEffect } from "react";
import "../styles/components/ButtonFilter.css";

export default function ButtonFilter({ history, handleGetCategories }) {
  const [filtered, setFiltered] = useState([]);

  // useEffect(() => {
  //   const {
  //     location: { pathname },
  //   } = history;
  //   const handleFilter = async () => {
  //     const categoryApi = await getCategory(pathname);
  //     return setFiltered(categoryApi);
  //   };
  //   handleFilter();
  // }, [history]);

  return (
    <div className="button-filter-div">
      <button
        className="btn"
        type="button"
        data-testid="All-category-filter"
        name="ALL"
        onClick={handleGetCategories}
      >
        All
      </button>
      {filtered.map((name, index) => {
        const NUMBER_FIVE = 5;
        if (index < NUMBER_FIVE) {
          const { strCategory } = name;
          return (
            <label htmlFor={index} key={index}>
              {strCategory}
              <input
                id={index}
                className="btn"
                data-testid={`${strCategory}-category-filter`}
                type="checkbox"
                name={strCategory}
                onChange={handleGetCategories}
              />
            </label>
          );
        }
        return [];
      })}
    </div>
  );
}
