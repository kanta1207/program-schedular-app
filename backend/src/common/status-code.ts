import { HttpStatus } from '@nestjs/common';

export type StatusCode = {
  code: number;
  message: string;
};

export class StatusCodes {
  public static STATUS_OK: StatusCode = {
    code: HttpStatus.OK,
    message: 'OK',
  };

  public static STATUS_CREATED: StatusCode = {
    code: HttpStatus.CREATED,
    message: 'Created',
  };

  public static STATUS_NO_CONTENT: StatusCode = {
    code: HttpStatus.NO_CONTENT,
    message: 'No Content',
  };

  public static STATUS_BAD_REQUEST: StatusCode = {
    code: HttpStatus.BAD_REQUEST,
    message: 'Bad Request',
  };

  public static STATUS_INTERNAL_SERVER_ERROR: StatusCode = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  };
}
