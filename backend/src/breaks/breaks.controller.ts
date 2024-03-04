import { Controller, Get } from '@nestjs/common';
import { BreaksService } from './breaks.service';
import { ApiResponse } from 'src/common/api-response';
import { StatusCodes } from 'src/common/status-code';

@Controller('breaks')
export class BreaksController {
  constructor(private readonly breakService: BreaksService) {}

  @Get()
  async findAll() {
    const breaks = await this.breakService.findAll();
    return ApiResponse.success(
      breaks,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }
}
