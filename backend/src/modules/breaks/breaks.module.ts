import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Break } from 'src/entity';

import { BreaksController } from './breaks.controller';
import { BreaksService } from './breaks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Break])],
  controllers: [BreaksController],
  providers: [BreaksService],
})
export class BreaksModule {}
