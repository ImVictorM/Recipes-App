import React from "react";
import { Link } from "react-router-dom";

import {
  RecipesFavoriteEmptyProps,
  EmptyState,
  EmptyStateLink,
} from "./RecipesEmptyByType.types";

const drinkLink: EmptyStateLink = {
  to: "/drinks",
  text: "Search for drinks",
};
const mealLink: EmptyStateLink = {
  to: "/meals",
  text: "Search for meals",
};

export default function RecipesEmptyByType({
  type,
  action = "done",
  prefixDataTestId,
}: RecipesFavoriteEmptyProps) {
  /** Only one type verification */
  const emptyState: EmptyState = React.useMemo(() => {
    switch (type) {
      case "all":
        return {
          titleMessage: `You haven't ${action} any recipes yet`,
          links: [mealLink, drinkLink],
        };
      case "drink":
        return {
          titleMessage: `You haven't ${action} any drinks yet`,
          links: [drinkLink],
        };
      case "meal":
        return {
          titleMessage: `You haven't ${action} any food yet`,
          links: [mealLink],
        };
    }
  }, [type, action]);

  return (
    <section
      className={`d-flex flex-column align-items-center justify-content-center mt-4`}
      data-testid={prefixDataTestId}
    >
      <h2 className="text-center">{emptyState.titleMessage}</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {emptyState.links.map(({ text, to }) => (
          <Link
            className="link-secondary link-offset-2 link-underline-opacity-50 link-underline-opacity-75-hover mx-2 my-1"
            key={to}
            to={to}
          >
            {text}
          </Link>
        ))}
      </div>
    </section>
  );
}
