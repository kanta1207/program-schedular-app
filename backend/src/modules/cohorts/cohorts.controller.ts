import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CohortsService } from './cohorts.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import { ApiResponse } from 'src/common/api-response';
import { StatusCodes } from 'src/common/status-code';

@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @Post()
  async create(@Body() createCohortDto: CreateCohortDto) {
    const createdCohort = await this.cohortsService.create(createCohortDto);
    return ApiResponse.new(
      createdCohort,
      StatusCodes.STATUS_CREATED.code,
      StatusCodes.STATUS_CREATED.message,
    );
  }

  @Get()
  async findAll() {
    const cohorts = await this.cohortsService.findAll();
    return ApiResponse.new(cohorts);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const cohort = await this.cohortsService.findOne(id);
    return ApiResponse.new(cohort);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCohortDto: UpdateCohortDto,
  ) {
    const updatedCohort = await this.cohortsService.update(id, updateCohortDto);
    return ApiResponse.new(updatedCohort);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.cohortsService.remove(id);
    return ApiResponse.new(
      null,
      StatusCodes.STATUS_NO_CONTENT.code,
      StatusCodes.STATUS_NO_CONTENT.message,
    );
  }
}
