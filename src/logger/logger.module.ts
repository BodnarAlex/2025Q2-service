import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
