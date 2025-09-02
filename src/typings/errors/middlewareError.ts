export class MiddlewareError extends Error {
  readonly qs: URLSearchParams;
  constructor(qs: URLSearchParams) {
    super();
    this.qs = qs;
  }
  getQSIntoString(): string {
    return this.qs.toString();
  }
}
