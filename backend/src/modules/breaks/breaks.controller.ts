import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { BreaksService } from './breaks.service';
import { ApiResponse } from 'src/common/api-response';
import { StatusCodes } from 'src/common/status-code';
import { CreateBreakDto } from './dto/create-break.dto';
import { UpdateBreakDto } from './dto/update-break.dto';

@Controller('breaks')
export class BreaksController {
  constructor(private readonly breakService: BreaksService) {}

  @Get()
  async findAll() {
    const breaks = await this.breakService.findAll();
    return ApiResponse.new(breaks);
  }

  @Post()
  async create(@Body() createBreakDto: CreateBreakDto) {
    const createdBreak = await this.breakService.create(createBreakDto);
    return ApiResponse.new(
      createdBreak,
      StatusCodes.STATUS_CREATED.code,
      StatusCodes.STATUS_CREATED.message,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBreakDto: UpdateBreakDto,
  ) {
    const updatedBreak = await this.breakService.update(id, updateBreakDto);
    return ApiResponse.new(updatedBreak);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    await this.breakService.remove(id);
    return ApiResponse.new(
      null,
      StatusCodes.STATUS_NO_CONTENT.code,
      StatusCodes.STATUS_NO_CONTENT.message,
    );
  }
}
