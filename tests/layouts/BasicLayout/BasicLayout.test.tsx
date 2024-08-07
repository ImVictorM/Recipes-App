import { screen, within } from "@testing-library/react";

import BasicLayout from "@/layouts/BasicLayout";

import renderElement from "../../helpers/render/renderElement";

const BasicLayoutDefault = (
  props: Partial<React.ComponentProps<typeof BasicLayout>>
) => (
  <BasicLayout {...props}>
    <h1>Page content</h1>
  </BasicLayout>
);

const checkLayoutRendersBaseElements = () => {
  const layout = screen.getByTestId("BasicLayout");
  const layoutContent = within(layout).getByTestId("BasicLayout.Content");
  const layoutHeader = within(layout).getByTestId("BasicLayout.Header");
  const layoutFooter = within(layout).getByTestId("BasicLayout.Footer");

  within(layoutContent).getByRole("heading", { name: "Page content" });

  return { layoutContent, layoutHeader, layoutFooter };
};

describe("layout: BasicLayout", () => {
  it("renders correctly with search bar", () => {
    renderElement(<BasicLayoutDefault containHeaderSearchBar />);

    const { layoutHeader } = checkLayoutRendersBaseElements();

    within(layoutHeader).getByTestId("BasicLayout.Header.ButtonSearch");
  });

  it("renders correctly without search bar", () => {
    renderElement(<BasicLayoutDefault />);

    const { layoutHeader } = checkLayoutRendersBaseElements();

    expect(
      within(layoutHeader).queryByTestId("BasicLayout.Header.ButtonSearch")
    ).not.toBeInTheDocument();
  });
});
