import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { ProgramsModule } from './modules/programs/programs.module';
import { IntakesModule } from './modules/intakes/intakes.module';
import { BreaksModule } from './modules/breaks/breaks.module';
import { InstructorsModule } from './modules/instructors/instructors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    IntakesModule,
    BreaksModule,
    ProgramsModule,
    InstructorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
