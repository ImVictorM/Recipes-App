import { useMemo, useState } from "react";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import "@/sass/components/_recipeListWithPagination.scss";
import { Recipe } from "@/store/slices/menuSlice";

export type RecipeListWithPaginationProps = {
  recipes: Recipe[];
  navigateTo: (recipe: Recipe) => string;
};

export default function RecipeListWithPagination({
  recipes,
  navigateTo,
}: RecipeListWithPaginationProps) {
  const ITEMS_PER_PAGE = 12;
  const MAX_PAGE_BLOCKS_UI = 7;
  const totalPages = Math.floor(recipes.length / ITEMS_PER_PAGE);
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
    <Container as="section" fluid className="my-2">
      <Row xs={1} sm={2} md={3} as="ul" className="list-unstyled p-0 g-4 my-2">
        {recipes
          .slice(uiItemsIndex.firstItemIndex, uiItemsIndex.lastItemIndex)
          .map((item, index) => {
            const { name, img, id } = item;

            return (
              <Col as="li" key={id} data-testid={`${index}-recipe-card`}>
                <Card className="recipe-card shadow m-0">
                  <Card.Link
                    href={navigateTo(item)}
                    className="text-decoration-none"
                  >
                    <Container fluid className="recipe-card--img-container p-0">
                      <Card.Img
                        className="recipe-card-img"
                        variant="top"
                        src={img}
                        alt={name}
                        data-testid={`${index}-card-img`}
                      />
                    </Container>

                    <Card.Body className="recipe-card-body">
                      <Card.Title
                        className="recipe-card-body-title"
                        data-testid={`${index}-card-name`}
                      >
                        {name}
                      </Card.Title>
                    </Card.Body>
                  </Card.Link>
                </Card>
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
              <Pagination.Ellipsis linkClassName="page-item" as="button" />
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
