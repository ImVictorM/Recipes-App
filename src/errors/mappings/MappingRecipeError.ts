import MappingError from "./MappingError";

export default class MappingRecipeError extends MappingError {
  constructor(mapReturnType: string) {
    super(`Unexpected error mapping the recipe to ${mapReturnType} type.`);
  }
}
