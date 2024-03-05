import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ApiResponse } from 'src/common/api-response';
import { StatusCodes } from 'src/common/status-code';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programService: ProgramsService) {}

  @Get()
  async findAll() {
    const programs = await this.programService.findAll();
    return ApiResponse.new(
      programs,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Patch(':id')
  async update() {
    const program = await this.programService.update();
    return ApiResponse.new(
      program,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Delete(':id')
  async delete() {
    await this.programService.delete();
    return ApiResponse.new(
      {},
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }
}
