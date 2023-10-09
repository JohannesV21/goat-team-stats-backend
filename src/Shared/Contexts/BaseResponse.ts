export class BaseResponse {
  constructor(
    public success: boolean,
    public message: string,
    public statusCode: number
  ) {}
}
