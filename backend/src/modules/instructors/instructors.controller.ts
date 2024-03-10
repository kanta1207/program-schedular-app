import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { StatusCodes } from 'src/common/status-code';
import { ApiResponse } from 'src/common/api-response';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    const instructor =
      await this.instructorsService.create(createInstructorDto);

    return ApiResponse.new(
      instructor,
      StatusCodes.STATUS_CREATED.code,
      StatusCodes.STATUS_CREATED.message,
    );
  }

  @Get()
  async findAll(
    @Query('rangeId') rangeId: number | undefined,
    @Query('courseId') courseId: number | undefined,
  ) {
    const instructors = await this.instructorsService.findAll(
      rangeId,
      courseId,
    );
    return ApiResponse.new(
      instructors,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const instructor = await this.instructorsService.findOne(id);
    return ApiResponse.new(
      instructor,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    const instructor = await this.instructorsService.update(
      id,
      updateInstructorDto,
    );
    return ApiResponse.new(
      instructor,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.instructorsService.remove(id);
    return ApiResponse.new(
      null,
      StatusCodes.STATUS_NO_CONTENT.code,
      StatusCodes.STATUS_NO_CONTENT.message,
    );
  }
}
