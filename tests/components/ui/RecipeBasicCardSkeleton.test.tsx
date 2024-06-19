import { within } from "@testing-library/react";

import RecipeBasicCardSkeleton from "@/components/ui/RecipeBasicCardSkeleton";

import renderElement from "../../utils/render/renderElement";

const RecipeBasicCardSkeletonDefault = () => <RecipeBasicCardSkeleton />;

describe("component: RecipeBasicCardSkeleton", () => {
  it("renders correctly", () => {
    const { container } = renderElement(<RecipeBasicCardSkeletonDefault />);

    within(container).getByTestId("BasicCardSkeleton");
    within(container).getByTestId("BasicCardSkeleton.ImgPlaceholder");
    within(container).getByTestId("BasicCardSkeleton.Body");
    within(container).getByTestId("BasicCardSkeleton.Body.TitlePlaceholder");
  });
});
