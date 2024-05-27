import { checkCircularIcon } from "@/assets/icons";
import { CenteredTitleWithIcon, RecipesFilter } from "@/components";
import { BasicLayout } from "@/layouts";

export default function RecipesDone() {
  return (
    <BasicLayout>
      <CenteredTitleWithIcon
        title="Done Recipes"
        icon={{ src: checkCircularIcon, alt: "check" }}
      />

      <RecipesFilter />
    </BasicLayout>
  );
}
