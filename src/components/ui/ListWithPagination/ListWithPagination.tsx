import React from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";

import waitForMs from "@/utils/waitForMs";

import { ListWithPaginationProps } from "./ListWithPagination.types";

/**
 * Avoid re-declaration of constants on every render
 * by keeping them outside the component.
 */
const DEFAULT_ITEMS_PER_PAGE = 12;
const DEFAULT_SIZES = {
  xs: 1,
  sm: 2,
  md: 3,
};
const MAX_PAGE_BLOCKS_UI = 7;
const LOADING_DELAY_THRESHOLD_MS = 500;

export default function ListWithPagination<T>({
  items,
  getItemId,
  itemsPerPageBySize = DEFAULT_SIZES,
  renderItemCard,
  renderItemCardSkeleton,
  maxItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  loading = false,
  prefixDataTestId = "ListWithPagination",
}: ListWithPaginationProps<T>) {
  const totalPages: number = Math.max(
    Math.ceil(items.length / maxItemsPerPage),
    1
  );

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [lastLoadingTime, setLastLoadingTime] = React.useState<number>(
    new Date().getTime()
  );
  const [showSkeleton, setShowSkeleton] = React.useState<boolean>(
    loading && Boolean(renderItemCardSkeleton) && items.length === 0
  );

  const uiItemsIndex = React.useMemo(() => {
    const lastItemIndexCalc = currentPage * maxItemsPerPage;
    return {
      firstItemIndex: (currentPage - 1) * maxItemsPerPage,
      lastItemIndex:
        lastItemIndexCalc > items.length ? items.length : lastItemIndexCalc,
    };
  }, [currentPage, maxItemsPerPage, items.length]);

  const showPagination: boolean = React.useMemo(() => {
    return totalPages > 1 && items.length > 0 && !loading;
  }, [items.length, loading, totalPages]);

  const paginationItemsToShow = React.useMemo(() => {
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
        currentPage - 2,
        currentPage + 1
      );
      return [1, "...", ...middlePortion, "...", totalPages];
    }

    const rightPortion = allPaginationItems.slice(totalPages - 5);
    return [1, "...", ...rightPortion];
  }, [totalPages, currentPage]);

  const handleMoveToPreviousPage = () => {
    /** If prev - 1 is equal to 0, then return 1 */
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleMoveToNextPage = () => {
    /** If prev + 1 is greater than the total pages, then return total pages */
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleMoveToSpecificPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    const handleLoadingChange = async () => {
      if (!renderItemCardSkeleton) return;
      /**
       * For the item to show, the page must be loading
       * and the items list must be empty.
       * Sometimes, the loading state will update
       * to true before the items are set.
       */
      if (loading || items.length === 0) {
        setLastLoadingTime(new Date().getTime());
        setShowSkeleton(true);
      } else {
        /**
         * Slow the transition to not flicker the cards
         */
        const now = new Date().getTime();
        const pastTime = now - lastLoadingTime;

        if (pastTime < LOADING_DELAY_THRESHOLD_MS) {
          await waitForMs(LOADING_DELAY_THRESHOLD_MS - pastTime);
        }

        setShowSkeleton(false);
      }
    };

    handleLoadingChange();
  }, [renderItemCardSkeleton, items.length, lastLoadingTime, loading]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return (
    <section data-testid={prefixDataTestId}>
      <Row
        {...itemsPerPageBySize}
        as="ul"
        className="list-unstyled p-0 g-4 m-0 mb-5"
      >
        {showSkeleton &&
          Array.from({ length: maxItemsPerPage }).map((_, index: number) => (
            <Col as="li" key={index} className="d-flex px-1">
              {renderItemCardSkeleton}
            </Col>
          ))}

        {!showSkeleton &&
          items
            .slice(uiItemsIndex.firstItemIndex, uiItemsIndex.lastItemIndex)
            .map((item, index) => (
              <Col as="li" key={getItemId(item, index)} className="d-flex px-1">
                {renderItemCard(item, index)}
              </Col>
            ))}
      </Row>

      {showPagination && (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center mb-4"
        >
          <Pagination
            className="m-0"
            data-testid={`${prefixDataTestId}.Pagination`}
          >
            <Pagination.Prev
              as="button"
              onClick={handleMoveToPreviousPage}
              data-testid={`${prefixDataTestId}.Pagination.Prev`}
            />

            {paginationItemsToShow.map((item, index) => {
              // if it is not a number, it is an ellipsis
              if (typeof item === "number") {
                const isActive = currentPage === item;

                return (
                  <Pagination.Item
                    as="button"
                    key={index}
                    active={isActive}
                    onClick={() => handleMoveToSpecificPage(item)}
                    data-testid={
                      isActive
                        ? `${prefixDataTestId}.Pagination.Item.${item}.Active`
                        : `${prefixDataTestId}.Pagination.Item.${item}`
                    }
                  >
                    {item}
                  </Pagination.Item>
                );
              }

              return (
                <Pagination.Ellipsis
                  key={index}
                  as="button"
                  data-testid={`${prefixDataTestId}.Pagination.Items.Ellipsis`}
                />
              );
            })}

            <Pagination.Next
              as="button"
              onClick={handleMoveToNextPage}
              data-testid={`${prefixDataTestId}.Pagination.Next`}
            />
          </Pagination>
        </Container>
      )}
    </section>
  );
}
