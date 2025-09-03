export class FetchError extends Error {
  private readonly status: number;
  readonly message: string;
  constructor({ response, message }: { response: Response; message: string }) {
    super();
    this.status = response.status;
    this.message = message;
  }
  getMessage() {
    return this.message;
  }
}
