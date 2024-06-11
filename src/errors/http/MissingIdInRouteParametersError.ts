import { HttpStatus } from "./HttpStatus";

export default class MissingIdInRouteParametersError extends Response {
  constructor() {
    super("Missing id in route parameters.", {
      status: HttpStatus.BAD_REQUEST.code,
      statusText: HttpStatus.BAD_REQUEST.text,
    });
  }
}
