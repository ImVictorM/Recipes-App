import { useMemo, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";

export type ItemWithId = {
  id: string;
};

export type ListWithPaginationProps<T extends ItemWithId> = {
  items: T[];
  onCreateItemCard: (item: T, index: number) => React.ReactElement;
  showBySize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  maxItemsPerPage?: number;
};

const DEFAULT_ITEMS_PER_PAGE = 12;
const DEFAULT_SIZES = {
  xs: 1,
  sm: 2,
  md: 3,
};

export default function ListWithPagination<T extends ItemWithId>({
  items,
  showBySize = DEFAULT_SIZES,
  onCreateItemCard,
  maxItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: ListWithPaginationProps<T>) {
  const MAX_PAGE_BLOCKS_UI = 7;
  const totalPages = Math.max(Math.floor(items.length / maxItemsPerPage), 1);
  const [currentPage, setCurrentPage] = useState(1);
  const uiItemsIndex = useMemo(() => {
    return {
      firstItemIndex: (currentPage - 1) * maxItemsPerPage,
      lastItemIndex: currentPage * maxItemsPerPage,
    };
  }, [currentPage, maxItemsPerPage]);

  const showPagination = useMemo(() => {
    return totalPages > 1 && items.length > 0;
  }, [items.length, totalPages]);

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
      <Row {...showBySize} as="ul" className="list-unstyled p-0 g-4 m-0 mb-5">
        {items
          .slice(uiItemsIndex.firstItemIndex, uiItemsIndex.lastItemIndex)
          .map((item, index) => {
            return (
              <Col as="li" key={item.id} className="d-flex">
                {onCreateItemCard(item, index)}
              </Col>
            );
          })}
      </Row>

      {showPagination && (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center mb-4"
        >
          <Pagination className="m-0">
            <Pagination.Prev as="button" onClick={handleMoveToPreviousPage} />

            {paginationItemsToShow.map((item, index) => {
              // if it is not a number, it is an ellipsis
              if (typeof item === "number") {
                return (
                  <Pagination.Item
                    as="button"
                    key={index}
                    active={currentPage === item}
                    onClick={() => handleMoveToSpecificPage(item)}
                  >
                    {item}
                  </Pagination.Item>
                );
              }

              return <Pagination.Ellipsis key={index} as="button" />;
            })}

            <Pagination.Next as="button" onClick={handleMoveToNextPage} />
          </Pagination>
        </Container>
      )}
    </Container>
  );
}
