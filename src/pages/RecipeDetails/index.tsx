import { RecipeDetailsLoadedContent } from "./components";
import { Await, useLoaderData } from "@/utils/reactRouterDom";
import { RecipeDetailsLoader } from "@/router";
import { toRecipeWithDetailsAndRecommendations } from "@/utils/recipeMappers";
import React from "react";

export default function RecipeDetails() {
  const data = useLoaderData<RecipeDetailsLoader>();

  return (
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <Await
        resolve={data.recipeWithRecommendations}
        errorElement={<p>error</p>}
      >
        {(recipeWithRecommendations) => {
          const recipe = toRecipeWithDetailsAndRecommendations(
            ...recipeWithRecommendations
          );
          return <RecipeDetailsLoadedContent recipe={recipe} />;
        }}
      </Await>
    </React.Suspense>
  );
}
