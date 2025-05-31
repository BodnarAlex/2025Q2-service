import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 4000;

  await app.listen(PORT);
}
bootstrap();
