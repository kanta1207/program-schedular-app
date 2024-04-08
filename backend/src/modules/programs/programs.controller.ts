import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ApiResponse } from '../../common/api-response';
import { StatusCodes } from '../../common/status-code';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

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

  @Post()
  async create(@Body() createProgramDto: CreateProgramDto) {
    const program = await this.programService.create(createProgramDto);
    return ApiResponse.new(
      program,
      StatusCodes.STATUS_CREATED.code,
      StatusCodes.STATUS_CREATED.message,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    const program = await this.programService.update(id, updateProgramDto);
    return ApiResponse.new(
      program,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.programService.remove(id);
    return ApiResponse.new(
      null,
      StatusCodes.STATUS_NO_CONTENT.code,
      StatusCodes.STATUS_NO_CONTENT.message,
    );
  }
}
