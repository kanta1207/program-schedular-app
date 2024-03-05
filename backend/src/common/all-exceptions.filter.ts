import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from './status-code';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code;
    let message = StatusCodes.STATUS_INTERNAL_SERVER_ERROR.message;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse['message'] || message;
    }

    // Stack trace
    const stack =
      exception instanceof Error ? exception.stack : 'No stack trace available';

    // Output error log
    const timestamp = new Date().toISOString();
    const path = request.url;
    Logger.error(
      `Timestamp: ${timestamp}, Path: ${path}, Message: ${message}`,
      stack,
    );

    // Response to the client
    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
