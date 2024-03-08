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

    // Default: 500 Internal Server Error
    let statusCode = StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code;
    let messages = [StatusCodes.STATUS_INTERNAL_SERVER_ERROR.message];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      // Get error messages from response
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        messages = [exceptionResponse];
      }
      if (exceptionResponse['message']) {
        const resMsg = exceptionResponse['message'];
        messages = Array.isArray(resMsg) ? resMsg : [resMsg];
      }
    }

    // Stack trace
    const stack =
      exception instanceof Error ? exception.stack : 'No stack trace available';

    // Output error log
    const timestamp = new Date().toISOString();
    const path = request.url;
    Logger.error(
      `Timestamp: ${timestamp}, Path: ${path}, Message: ${messages.join(', ')}`,
      stack,
    );

    // Response to the client
    response.status(statusCode).json({
      statusCode,
      messages,
    });
  }
}
