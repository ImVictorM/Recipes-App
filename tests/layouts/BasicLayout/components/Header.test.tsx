import { screen, act } from "@testing-library/react";

import Header from "@/layouts/BasicLayout/components/Header";

import renderElement from "../../../helpers/render/renderElement";

const HeaderDefault = (props: Partial<React.ComponentProps<typeof Header>>) => (
  <Header {...props} />
);

describe("layout: BasicLayout - component: Header", () => {
  it("renders with search bar correctly", () => {
    renderElement(<HeaderDefault containSearchBar={true} />);

    expect(screen.getByTestId("Header.LinkProfile")).toHaveAttribute(
      "href",
      "/profile"
    );
    screen.getByTestId("Header.ButtonSearch");
  });

  it("renders without search bar correctly", () => {
    renderElement(<HeaderDefault />);

    screen.getByTestId("Header.LinkProfile");
    expect(screen.queryByTestId("Header.ButtonSearch")).not.toBeInTheDocument();
  });

  it("shows a tooltip when hovering through the buttons/links", async () => {
    const { user } = renderElement(<HeaderDefault containSearchBar />);

    const linkProfile = screen.getByTestId("Header.LinkProfile");
    const buttonSearch = screen.getByTestId("Header.ButtonSearch");

    await act(async () => {
      await user.hover(buttonSearch);
    });

    expect(screen.getByTestId("Header.ButtonSearch.Tooltip")).toHaveTextContent(
      "Search for recipes"
    );

    await act(async () => {
      await user.hover(linkProfile);
    });

    expect(screen.getByTestId("Header.LinkProfile.Tooltip")).toHaveTextContent(
      "Profile"
    );
  });

  it("changes the global visibility state when clicking the search button", async () => {
    const { store, user } = renderElement(<HeaderDefault containSearchBar />);

    const buttonSearch = screen.getByTestId("Header.ButtonSearch");

    expect(store.getState().visibility.showSearchBar).toBe(false);

    await act(async () => {
      await user.click(buttonSearch);
    });

    expect(store.getState().visibility.showSearchBar).toBe(true);

    await act(async () => {
      await user.click(buttonSearch);
    });

    expect(store.getState().visibility.showSearchBar).toBe(false);
  });
});
