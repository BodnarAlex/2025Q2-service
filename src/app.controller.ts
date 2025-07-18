import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './security/security.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getRoot(): string {
    return this.appService.getHello();
  }
}
