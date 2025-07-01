import { Global, Module } from '@nestjs/common';
import { LoggingService } from './logger.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: LoggingService,
      useClass: LoggingService,
    },
  ],
  exports: [LoggingService],
})
export class LoggerModule {}
