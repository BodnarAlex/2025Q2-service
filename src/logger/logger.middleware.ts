import { NestMiddleware, Injectable } from '@nestjs/common';
import { LoggingService } from './logger.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const start = Date.now();

    res.on('finish', () => {
      const ms = Date.now() - start;
      const msg = `[HTTP] ${method} | Url: ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)} | Status: ${JSON.stringify(res.statusCode)} | ${JSON.stringify(ms)}ms`;

      this.loggingService.log(msg);
    });

    next();
  }
}
