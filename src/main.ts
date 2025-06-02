import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 4000;

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The music library service')
    .setVersion('1.0')
    .addTag('music')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config, {
    include: [
      UserModule,
      TrackModule,
      ArtistModule,
      AlbumModule,
      FavoritesModule,
    ],
  });

  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(PORT);
}
bootstrap();
