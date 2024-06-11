import { HttpStatus } from "./HttpStatus";

export default class NotFoundError extends Response {
  constructor(message: string) {
    super(message, {
      status: HttpStatus.NOT_FOUND.code,
      statusText: HttpStatus.NOT_FOUND.text,
    });
  }
}
