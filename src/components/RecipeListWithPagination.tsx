import { useMemo, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

export type Item = {
  id: string;
  img: string;
  name: string;
};

export type RecipeListWithPaginationProps = {
  items: Item[];
  navigateTo: (item: Item) => string;
};

export default function RecipeListWithPagination({
  items,
  navigateTo,
}: RecipeListWithPaginationProps) {
  const ITEMS_PER_PAGE = 12;
  const MAX_PAGE_BLOCKS_UI = 7;
  const totalPages = Math.floor(items.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const uiItemsIndex = useMemo(() => {
    return {
      firstItemIndex: (currentPage - 1) * ITEMS_PER_PAGE,
      lastItemIndex: currentPage * ITEMS_PER_PAGE,
    };
  }, [currentPage]);

  const paginationItemsToShow = useMemo(() => {
    const allPaginationItems = Array.from(
      { length: totalPages },
      (_v, i) => i + 1
    );
    if (totalPages <= MAX_PAGE_BLOCKS_UI) {
      return allPaginationItems;
    }

    if (currentPage < 5) {
      const leftPortion = allPaginationItems.slice(0, 5);
      return [...leftPortion, "...", totalPages];
    }

    if (currentPage < totalPages - 3) {
      const middlePortion = allPaginationItems.slice(
        currentPage - 1,
        currentPage + 1
      );
      return [1, "...", ...middlePortion, "...", totalPages];
    }

    const rightPortion = allPaginationItems.slice(totalPages - 4, totalPages);
    return [1, "...", ...rightPortion];
  }, [totalPages, currentPage]);

  const handleMoveToPreviousPage = () => {
    setCurrentPage((prev) => {
      if (prev - 1 >= 1) {
        return prev - 1;
      }
      return 1;
    });
  };

  const handleMoveToNextPage = () => {
    setCurrentPage((prev) => {
      if (prev + 1 <= totalPages) {
        return prev + 1;
      }
      return totalPages;
    });
  };

  const handleMoveToSpecificPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <ul className="mt-5">
        {items
          .slice(uiItemsIndex.firstItemIndex, uiItemsIndex.lastItemIndex)
          .map((item, index) => {
            const { name, img, id } = item;
            return (
              <li key={id} data-testid={`${index}-recipe-card`}>
                <Link to={navigateTo(item)}>
                  <img
                    className="img"
                    src={img}
                    alt={name}
                    data-testid={`${index}-card-img`}
                  />
                  <p data-testid={`${index}-card-name`}>{name}</p>
                </Link>
              </li>
            );
          })}
      </ul>

      <Pagination>
        <Pagination.Prev onClick={handleMoveToPreviousPage} />
        {paginationItemsToShow.map((item, index) => {
          // if it is not a number, it is an ellipsis
          if (typeof item === "number") {
            return (
              <Pagination.Item
                key={index}
                active={currentPage === item}
                onClick={() => handleMoveToSpecificPage(item)}
              >
                {item}
              </Pagination.Item>
            );
          }

          return <Pagination.Ellipsis />;
        })}
        <Pagination.Next onClick={handleMoveToNextPage} />
      </Pagination>
    </section>
  );
}
