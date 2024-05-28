import { useMemo, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { Recipe } from "@/store/slices/menuSlice";
import { RecipeBasicCard } from "@/components";
import "@/sass/pages/recipes/components/_recipesWithPagination.scss";

export type RecipesWithPaginationProps = {
  recipes: Recipe[];
};

export default function RecipesWithPagination({
  recipes,
}: RecipesWithPaginationProps) {
  const ITEMS_PER_PAGE = 12;
  const MAX_PAGE_BLOCKS_UI = 7;
  const totalPages = Math.max(Math.floor(recipes.length / ITEMS_PER_PAGE), 1);
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
    <Container as="section" fluid>
      <Row xs={1} sm={2} md={3} as="ul" className="list-unstyled p-0 g-4 m-0">
        {recipes
          .slice(uiItemsIndex.firstItemIndex, uiItemsIndex.lastItemIndex)
          .map((recipe, index) => {
            return (
              <Col as="li" key={recipe.id} data-testid={`${index}-recipe-card`}>
                <RecipeBasicCard recipe={recipe} index={index} scaleOnHover />
              </Col>
            );
          })}
      </Row>

      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <Pagination className="my-4">
          <Pagination.Prev
            linkClassName="page-item"
            as="button"
            onClick={handleMoveToPreviousPage}
          />
          {paginationItemsToShow.map((item, index) => {
            // if it is not a number, it is an ellipsis
            if (typeof item === "number") {
              return (
                <Pagination.Item
                  as="button"
                  key={index}
                  linkClassName="page-item"
                  active={currentPage === item}
                  onClick={() => handleMoveToSpecificPage(item)}
                >
                  {item}
                </Pagination.Item>
              );
            }

            return (
              <Pagination.Ellipsis
                key={index}
                linkClassName="page-item"
                as="button"
              />
            );
          })}
          <Pagination.Next
            linkClassName="page-item"
            as="button"
            onClick={handleMoveToNextPage}
          />
        </Pagination>
      </Container>
    </Container>
  );
}
