import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  controllers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
