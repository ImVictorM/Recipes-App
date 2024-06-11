export default class MappingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MappingError";
  }
}
