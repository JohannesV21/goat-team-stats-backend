export class ErrorResponse {
  public success: boolean = false;
  public message: string;
  public statusCode: number;
  public error: any;

  constructor({
    message,
    statusCode,
    error,
  }: {
    message: string;
    statusCode: number;
    error: any;
  }) {
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
