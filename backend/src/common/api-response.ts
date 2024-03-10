import { StatusCodes } from './status-code';

export class ApiResponse<T = void> {
  public readonly statusCode: number;
  public readonly messages: string[];
  public readonly data?: T | null;

  private constructor(
    statusCode: number,
    message: string | string[],
    data?: T,
  ) {
    this.statusCode = statusCode;
    this.messages = Array.isArray(message) ? message : [message];
    this.data = data ?? null;
  }

  public static new<T>(
    data: T,
    statusCode = StatusCodes.STATUS_OK.code,
    messages: string | string[] = StatusCodes.STATUS_OK.message,
  ): ApiResponse<T> {
    return new ApiResponse(statusCode, messages, data);
  }
}
