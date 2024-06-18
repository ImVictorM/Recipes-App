import BasicLayout from "@/layouts/BasicLayout";

import renderElement from "../../utils/render/renderElement";

const BasicLayoutDefault = (
  props: Partial<React.ComponentProps<typeof BasicLayout>>
) => (
  <BasicLayout {...props}>
    <h1>Page content</h1>
  </BasicLayout>
);

const checkLayoutRendersBaseElements = ({
  screen,
  within,
}: ReturnType<typeof renderElement>) => {
  const layoutContent = screen.getByTestId("BasicLayout.Content");
  const layoutHeader = screen.getByTestId("BasicLayout.Header");
  const layoutFooter = screen.getByTestId("BasicLayout.Footer");

  within(layoutContent).getByRole("heading", { name: "Page content" });

  return { layoutContent, layoutHeader, layoutFooter };
};

describe("layout: BasicLayout", () => {
  it("renders correctly with search bar", () => {
    const render = renderElement(<BasicLayoutDefault containHeaderSearchBar />);
    const { within } = render;

    const { layoutHeader } = checkLayoutRendersBaseElements(render);

    within(layoutHeader).getByTestId("BasicLayout.Header.ButtonSearch");
  });

  it("renders correctly without search bar", () => {
    const render = renderElement(<BasicLayoutDefault />);
    const { within } = render;

    const { layoutHeader } = checkLayoutRendersBaseElements(render);

    expect(
      within(layoutHeader).queryByTestId("BasicLayout.Header.ButtonSearch")
    ).not.toBeInTheDocument();
  });
});
