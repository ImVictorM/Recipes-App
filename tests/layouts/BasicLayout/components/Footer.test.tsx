import { screen, act } from "@testing-library/react";

import Footer from "@/layouts/BasicLayout/components/Footer";
import renderElement from "../../../helpers/render/renderElement";

const FooterDefault = () => <Footer />;

const links = {
  get meals() {
    return screen.getByTestId("Footer.LinkMeals");
  },
  get drinks() {
    return screen.getByTestId("Footer.LinkDrinks");
  },
};

describe("layout: BasicLayout - component: Footer", () => {
  it("renders correctly", () => {
    renderElement(<FooterDefault />);

    expect(links.meals).toHaveAttribute("href", "/meals");
    expect(links.drinks).toHaveAttribute("href", "/drinks");
  });

  it("shows a tooltip when hovering through the links", async () => {
    const { user } = renderElement(<FooterDefault />);

    await act(async () => {
      await user.hover(links.meals);
    });

    const mealsTooltip = screen.getByTestId("Footer.LinkMeals.Tooltip");
    expect(mealsTooltip).toHaveTextContent("Search for foods");

    await act(async () => {
      await user.hover(links.drinks);
    });

    const drinksTooltip = screen.getByTestId("Footer.LinkDrinks.Tooltip");
    expect(drinksTooltip).toHaveTextContent("Search for drinks");
  });
});
