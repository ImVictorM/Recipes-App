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
    const { screen, within } = renderElement(<HeroLayoutDefault />);

    screen.getByTestId("HeroLayout.Hero");
    within(screen.getByTestId("HeroLayout.Content")).getByRole("heading", {
      name: "content",
      level: 1,
    });
  });
});
