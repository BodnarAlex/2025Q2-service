import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  controllers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
