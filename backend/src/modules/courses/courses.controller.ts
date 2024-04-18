import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiResponse } from '../../common/api-response';
import { StatusCodes } from '../../common/status-code';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.coursesService.create(createCourseDto);
    return ApiResponse.new(
      course,
      StatusCodes.STATUS_CREATED.code,
      StatusCodes.STATUS_CREATED.message,
    );
  }

  @Get()
  async findAll() {
    const courses = await this.coursesService.findAll();
    return ApiResponse.new(courses);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const course = await this.coursesService.update(id, updateCourseDto);
    return ApiResponse.new(course);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.coursesService.remove(id);
    return ApiResponse.new(
      null,
      StatusCodes.STATUS_NO_CONTENT.code,
      StatusCodes.STATUS_NO_CONTENT.message,
    );
  }
}
