import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IntakesService } from './intakes.service';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';
import { ApiResponse } from 'src/common/api-response';
import { StatusCodes } from 'src/common/status-code';

@Controller('intakes')
export class IntakesController {
  constructor(private readonly intakesService: IntakesService) {}

  @Post()
  async create(@Body() createIntakeDto: CreateIntakeDto) {
    const intake = await this.intakesService.create(createIntakeDto);
    return ApiResponse.new(
      intake,
      StatusCodes.STATUS_CREATED.code,
      StatusCodes.STATUS_CREATED.message,
    );
  }

  @Get()
  async findAll() {
    const intakes = await this.intakesService.findAll();
    return ApiResponse.new(
      intakes,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const intake = await this.intakesService.findOne(id);
    return ApiResponse.new(
      intake,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateIntakeDto: UpdateIntakeDto,
  ) {
    const intake = await this.intakesService.update(id, updateIntakeDto);
    return ApiResponse.new(
      intake,
      StatusCodes.STATUS_OK.code,
      StatusCodes.STATUS_OK.message,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.intakesService.remove(id);
    return ApiResponse.new(
      null,
      StatusCodes.STATUS_NO_CONTENT.code,
      StatusCodes.STATUS_NO_CONTENT.message,
    );
  }
}
