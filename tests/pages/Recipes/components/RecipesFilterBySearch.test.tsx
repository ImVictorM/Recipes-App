import { screen, act } from "@testing-library/react";

import RecipesFilterBySearch from "@/pages/Recipes/components/RecipesFilterBySearch";

import renderElement from "../../../utils/render/renderElement";
import { RecipeFilterOptions } from "@/services/menu/common/enums";

const mockOnSearch = vi.fn();

const RecipesFilterBySearchDefault = (
  props: Partial<React.ComponentProps<typeof RecipesFilterBySearch>>
) => (
  <RecipesFilterBySearch
    onSearch={mockOnSearch}
    prefixDataTestId="Component"
    {...props}
  />
);

const form = {
  get inputSearch() {
    return screen.getByRole("textbox", {
      name: /search for recipes/i,
    });
  },
  get buttonSubmit() {
    return screen.getByRole("button", { name: /search/i });
  },
  radios: {
    get name() {
      return screen.getByRole("radio", { name: /name/i });
    },
    get ingredient() {
      return screen.getByRole("radio", {
        name: /ingredient/i,
      });
    },
    get firstLetter() {
      return screen.getByRole("radio", {
        name: /first letter/i,
      });
    },
  },
};

describe("page: Recipes - components: RecipesFilterBySearch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", () => {
    renderElement(<RecipesFilterBySearchDefault />);

    expect(form.inputSearch).toHaveValue("");
    expect(form.radios.name).toBeChecked();
    expect(form.radios.ingredient).not.toBeChecked();
    expect(form.radios.firstLetter).not.toBeChecked();
    expect(form.buttonSubmit).toBeDisabled();
  });

  it("empties the input value when changing the filter option", async () => {
    const { user } = renderElement(<RecipesFilterBySearchDefault />);

    await act(async () => {
      await user.type(form.inputSearch, "corba");
    });

    expect(form.inputSearch).toHaveValue("corba");

    await act(async () => {
      await user.click(form.radios.ingredient);
    });

    expect(form.inputSearch).toHaveValue("");
  });

  it("is not possible to make a search for recipes by first letter with more than one letter", async () => {
    const { user } = renderElement(<RecipesFilterBySearchDefault />);

    await act(async () => {
      await user.click(form.radios.firstLetter);
    });

    await act(async () => {
      await user.type(form.inputSearch, "more than one letter");
    });

    expect(form.inputSearch).toHaveValue("m");
  });

  it("calls the onSearch handler with the correct parameters for all options", async () => {
    const { user } = renderElement(<RecipesFilterBySearchDefault />);

    const options = [
      {
        radio: form.radios.name,
        inputValue: "corba",
        expectedOnSearchParameter: {
          searchQuery: "corba",
          searchFilter: RecipeFilterOptions.NAME,
        },
      },
      {
        radio: form.radios.firstLetter,
        inputValue: "a",
        expectedOnSearchParameter: {
          searchQuery: "a",
          searchFilter: RecipeFilterOptions.FIRST_LETTER,
        },
      },
      {
        radio: form.radios.ingredient,
        inputValue: "pepper",
        expectedOnSearchParameter: {
          searchQuery: "pepper",
          searchFilter: RecipeFilterOptions.INGREDIENT,
        },
      },
    ];

    for (const { inputValue, expectedOnSearchParameter, radio } of options) {
      await act(async () => {
        await user.click(radio);
      });

      await act(async () => {
        await user.type(form.inputSearch, inputValue);
      });

      await act(async () => {
        await user.click(form.buttonSubmit);
      });

      expect(mockOnSearch).toHaveBeenCalledWith(expectedOnSearchParameter);
    }
  });
});
