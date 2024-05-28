import { checkCircularIcon } from "@/assets/icons";
import { CenteredTitleWithIcon, RecipesFilterByType } from "@/components";
import { BasicLayout } from "@/layouts";

export default function RecipesDone() {
  const handleFilterByType = () => {};

  return (
    <BasicLayout>
      <CenteredTitleWithIcon
        title="Done Recipes"
        icon={{ src: checkCircularIcon, alt: "check" }}
      />

      <RecipesFilterByType onFilterByType={handleFilterByType} />
    </BasicLayout>
  );
}
