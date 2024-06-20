import { act, within } from "@testing-library/react";

import ListWithPagination from "@/components/ui/ListWithPagination";

import renderElement from "../../utils/render/renderElement";

type Item = {
  id: string;
  value: string;
};

const MAX_ITEMS_PER_PAGE = 3;

const createItems = (length: number) => {
  const items: Item[] = Array.from({ length }, (_, index) => ({
    id: `${index + 1}`,
    value: `item ${index + 1}`,
  }));

  return items;
};

const defaultItems = createItems(10);

const expectedTotalPages = Math.ceil(defaultItems.length / MAX_ITEMS_PER_PAGE);

const ItemSkeleton = <span data-testid="Skeleton">Loading...</span>;

const ListWithPaginationDefault = (
  props: Partial<React.ComponentProps<typeof ListWithPagination<Item>>>
) => {
  return (
    <ListWithPagination
      items={defaultItems}
      renderItemCard={({ id, value }) => (
        <span data-testid={`Item.${id}`}>{value}</span>
      )}
      getItemId={(item) => item.id}
      loading={false}
      maxItemsPerPage={MAX_ITEMS_PER_PAGE}
      {...props}
    />
  );
};

const checkItemsExistByPage = (
  container: HTMLElement,
  items: Item[],
  currentPage: number
) => {
  const firstItemIndex = (currentPage - 1) * MAX_ITEMS_PER_PAGE;

  const lastItemIndexCalc = currentPage * MAX_ITEMS_PER_PAGE;
  const lastItemIndex =
    lastItemIndexCalc > items.length ? items.length : lastItemIndexCalc;

  const currentPageItems = items.slice(firstItemIndex, lastItemIndex);
  const restPageItems = items.slice(lastItemIndex);

  within(container).getByTestId(
    `ListWithPagination.Pagination.Item.${currentPage}.Active`
  );

  currentPageItems.forEach(({ id, value }) => {
    expect(within(container).getByTestId(`Item.${id}`)).toHaveTextContent(
      value
    );
  });

  restPageItems.forEach(({ id }) => {
    expect(
      within(container).queryByTestId(`Item.${id}`)
    ).not.toBeInTheDocument();
  });
};

describe(`component: ListWithPagination - ${MAX_ITEMS_PER_PAGE} items per page`, () => {
  it("renders and changes the pages correctly when clicking the numeric buttons.", async () => {
    const { container, user } = renderElement(<ListWithPaginationDefault />);

    let currentPage = 1;

    while (currentPage <= expectedTotalPages) {
      checkItemsExistByPage(container, defaultItems, currentPage);

      if (currentPage !== expectedTotalPages) {
        const nextPage = within(container).getByTestId(
          `ListWithPagination.Pagination.Item.${currentPage + 1}`
        );

        await act(async () => {
          await user.click(nextPage);
        });
      }

      currentPage += 1;
    }
  });

  it("changes the page correctly when clicking the next and previous buttons", async () => {
    const { container, user } = renderElement(<ListWithPaginationDefault />);

    within(container).getByTestId(
      "ListWithPagination.Pagination.Item.1.Active"
    );

    const nextButton = within(container).getByTestId(
      "ListWithPagination.Pagination.Next"
    );
    const previousButton = within(container).getByTestId(
      "ListWithPagination.Pagination.Prev"
    );

    await act(async () => {
      await user.click(nextButton);
    });

    checkItemsExistByPage(container, defaultItems, 2);

    await act(async () => {
      await user.click(previousButton);
    });

    checkItemsExistByPage(container, defaultItems, 1);
  });

  describe("testing rendering with skeleton", () => {
    it("renders the skeleton instead of the item when loading is true and skeleton is defined", () => {
      const { container } = renderElement(
        <ListWithPaginationDefault
          renderItemCardSkeleton={ItemSkeleton}
          loading={true}
        />
      );

      expect(within(container).getAllByTestId("Skeleton")).toHaveLength(
        MAX_ITEMS_PER_PAGE
      );
    });

    /** Useful when loading state changes before the items is set */
    it("renders the skeleton when the items is empty, loading is false and skeleton is defined", () => {
      const { container } = renderElement(
        <ListWithPaginationDefault
          items={[]}
          renderItemCardSkeleton={ItemSkeleton}
          loading={false}
        />
      );

      expect(within(container).getAllByTestId("Skeleton")).toHaveLength(
        MAX_ITEMS_PER_PAGE
      );
    });

    it("renders the card correctly when items is not empty, loading is false and skeleton is defined", () => {
      const { container } = renderElement(
        <ListWithPaginationDefault
          loading={false}
          renderItemCardSkeleton={ItemSkeleton}
        />
      );

      checkItemsExistByPage(container, defaultItems, 1);
    });
  });

  describe("testing pagination blocks rendering", () => {
    it("does not render the pagination controllers if the items quantity is less than max items per page", () => {
      const { container } = renderElement(
        <ListWithPaginationDefault
          items={createItems(MAX_ITEMS_PER_PAGE - 1)}
        />
      );

      expect(
        within(container).queryByTestId("ListWithPagination.Pagination")
      ).not.toBeInTheDocument();
    });

    it("renders only numeric pagination blocks when total blocks are less than 7", () => {
      let itemsQuantity = MAX_ITEMS_PER_PAGE + 1;
      let currentPaginationBlock = 2;
      const itemsQuantityToSevenBlocks = MAX_ITEMS_PER_PAGE * 7;

      while (itemsQuantity <= itemsQuantityToSevenBlocks) {
        const { container } = renderElement(
          <ListWithPaginationDefault items={createItems(itemsQuantity)} />
        );

        const paginationItems = within(container).getAllByTestId(
          /ListWithPagination\.Pagination\.Item/
        );

        expect(paginationItems.length).toBe(currentPaginationBlock);

        paginationItems.forEach((item, index) => {
          expect(item).toHaveTextContent(`${index + 1}`);
        });

        itemsQuantity += MAX_ITEMS_PER_PAGE;
        currentPaginationBlock += 1;
      }
    });

    it("renders 6 pagination blocks and 1 ellipsis before the last block when active block is between the first 4 blocks", async () => {
      const { container, user } = renderElement(
        <ListWithPaginationDefault items={createItems(30)} />
      );

      let currentPage = 1;
      const expectedOrder = ["1", "2", "3", "4", "5", /.../, "10"];

      while (currentPage < 5) {
        within(container).getByTestId(
          `ListWithPagination.Pagination.Item.${currentPage}.Active`
        );

        const paginationItems = within(container).getAllByTestId(
          /ListWithPagination\.Pagination\.Item/
        );

        paginationItems.forEach((item, index) => {
          expect(item).toHaveTextContent(expectedOrder[index]);
        });

        await act(async () => {
          const nextPageBlock = within(container).getByTestId(
            `ListWithPagination.Pagination.Item.${currentPage + 1}`
          );
          await user.click(nextPageBlock);
        });

        currentPage += 1;
      }
    });

    it("renders 6 pagination blocks and 1 ellipsis after the first block when active block is between the last 4 blocks", async () => {
      const { container, user } = renderElement(
        <ListWithPaginationDefault items={createItems(30)} />
      );
      let currentPage = 10;

      await act(async () => {
        const lastPaginationBlock = within(container).getByTestId(
          `ListWithPagination.Pagination.Item.${currentPage}`
        );
        await user.click(lastPaginationBlock);
      });

      const expectedOrder = ["1", /.../, "6", "7", "8", "9", "10"];

      while (currentPage > 6) {
        within(container).getByTestId(
          `ListWithPagination.Pagination.Item.${currentPage}.Active`
        );

        const paginationItems =
          within(container).getAllByTestId(/Pagination\.Item/);

        paginationItems.forEach((item, index) => {
          expect(item).toHaveTextContent(expectedOrder[index]);
        });

        await act(async () => {
          const previousPaginationBlock = within(container).getByTestId(
            `ListWithPagination.Pagination.Item.${currentPage - 1}`
          );
          await user.click(previousPaginationBlock);
        });

        currentPage -= 1;
      }
    });

    it("renders 3 pagination blocks at the middle and 2 beside them ellipsis when active block is not between the first or last 4 blocks", async () => {
      const { container, user } = renderElement(
        <ListWithPaginationDefault items={createItems(30)} />
      );

      let currentPage = 5;
      const lastPage = 6;

      while (currentPage <= lastPage) {
        const currentPaginationBlock = within(container).getByTestId(
          `ListWithPagination.Pagination.Item.${currentPage}`
        );

        await act(async () => {
          await user.click(currentPaginationBlock);
        });

        const paginationItems = within(container).getAllByTestId(
          /ListWithPagination\.Pagination\.Item/
        );

        const expectedOrder = [
          "1",
          /.../,
          `${currentPage - 1}`,
          `${currentPage}`,
          `${currentPage + 1}`,
          /.../,
          "10",
        ];

        paginationItems.forEach((item, index) => {
          expect(item).toHaveTextContent(expectedOrder[index]);
        });

        currentPage += 1;
      }
    });
  });
});
