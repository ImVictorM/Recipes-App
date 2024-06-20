import { screen, within } from "@testing-library/react";

import HeroLayout from "@/layouts/HeroLayout";

import renderElement from "../../utils/render/renderElement";

import { sushiWithDetails } from "../../mocks/recipes/meals/sushi";

const HeroLayoutDefault = (
  props: Partial<React.ComponentProps<typeof HeroLayout>>
) => (
  <HeroLayout recipe={sushiWithDetails} {...props}>
    <h1>content</h1>
  </HeroLayout>
);

describe("layout: HeroLayout", () => {
  it("renders correctly", () => {
    renderElement(<HeroLayoutDefault />);

    const layout = screen.getByTestId("HeroLayout");
    const layoutContent = within(layout).getByTestId("HeroLayout.Content");

    within(layout).getByTestId("HeroLayout.Hero");
    within(layoutContent).getByRole("heading", {
      name: "content",
      level: 1,
    });
  });
});
