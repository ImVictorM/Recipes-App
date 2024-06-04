export default class MissingIdInRouteParametersError extends Response {
  constructor() {
    super("Missing id in route parameters", { status: 400 });
  }
}
