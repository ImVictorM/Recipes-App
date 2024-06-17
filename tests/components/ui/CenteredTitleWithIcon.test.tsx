import { within } from "@testing-library/dom";

import CenteredTitleWithIcon from "@/components/ui/CenteredTitleWithIcon";
import MealIcon from "@/assets/icons/mealIcon.svg";

import renderElement from "../../utils/renderElement";

const CenteredTitleWithIconDefault = (
  props: Partial<React.ComponentProps<typeof CenteredTitleWithIcon>>
) => {
  return (
    <CenteredTitleWithIcon
      icon={{ element: MealIcon, alt: "meal" }}
      title="Meals"
      {...props}
    />
  );
};

describe("Component: CenteredTitleWithIcon", () => {
  it("renders correctly", () => {
    const { container } = renderElement(<CenteredTitleWithIconDefault />);

    within(container).getByRole("img", { name: /meal/i });
    within(container).getByRole("heading", { name: /meals/i });
  });
});
