import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './api-response';
import { StatusCodes } from './status-code';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        // Get status code from HTTP response obj
        const httpStatus: number = context
          .switchToHttp()
          .getResponse().statusCode;

        const message: string =
          'message' in response && typeof response.message === 'string'
            ? response.message
            : StatusCodes.STATUS_OK.message;

        const data = 'data' in response ? response.data : {};

        return ApiResponse.success<T>(data, httpStatus, message);
      }),
    );
  }
}
