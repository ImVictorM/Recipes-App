import { AxiosResponse } from "axios";

import { GenericMealApiResponse, Meal } from "@/services/menu/meal/types";

const getMealsResponse = (
  meals: Meal[]
): Partial<AxiosResponse<GenericMealApiResponse>> => ({
  data: { meals },
});

export default getMealsResponse;
