import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { ProgramsModule } from './modules/programs/programs.module';
import { BreaksModule } from './modules/breaks/breaks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    BreaksModule,
    ProgramsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
