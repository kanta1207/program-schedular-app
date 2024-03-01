import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { BreaksModule } from './breaks/breaks.module';
import { BreaksController } from './breaks/breaks.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    BreaksModule,
  ],
  controllers: [AppController, BreaksController],
  providers: [AppService],
})
export class AppModule {}
