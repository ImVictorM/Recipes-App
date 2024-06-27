import { AxiosResponse } from "axios";

import { GenericMealApiResponse, Meal } from "@/services/menu/meal/types";

const getMealDetailsByIdResponse = (
  meal: Meal
): Partial<AxiosResponse<GenericMealApiResponse>> => ({
  data: {
    meals: [meal],
  },
});

export default getMealDetailsByIdResponse;
