import { StatusCodes } from './status-code';

export class ApiResponse<T = void> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data?: T | null;

  private constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || null;
  }

  public static success<T>(
    data: T,
    statusCode?: number,
    message?: string,
  ): ApiResponse<T> {
    const resultCode: number = statusCode || StatusCodes.STATUS_OK.code;
    const resultMessage: string = message || StatusCodes.STATUS_OK.message;

    return new ApiResponse(resultCode, resultMessage, data);
  }

  public static error(statusCode?: number, message?: string): ApiResponse {
    const resultCode: number =
      statusCode || StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code;
    const resultMessage: string =
      message || StatusCodes.STATUS_INTERNAL_SERVER_ERROR.message;

    return new ApiResponse(resultCode, resultMessage);
  }
}
