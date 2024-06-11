export enum RecipeFilterOptions {
  FIRST_LETTER = "firstLetter",
  NAME = "name",
  INGREDIENT = "ingredient",
  CATEGORY = "category",
}

export const getFilterEndpointByOption = (
  query: string,
  option: RecipeFilterOptions
): string => {
  switch (option) {
    case RecipeFilterOptions.NAME:
      return `search.php?s=${query}`;
    case RecipeFilterOptions.FIRST_LETTER:
      return `search.php?f=${query}`;

    case RecipeFilterOptions.INGREDIENT:
      return `filter.php?i=${query}`;
    case RecipeFilterOptions.CATEGORY:
      return `filter.php?c=${query}`;
  }
};
