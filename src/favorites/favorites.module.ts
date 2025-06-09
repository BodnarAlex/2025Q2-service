import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { Favorite } from './entities/favorite.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Album, Track, Artist])],

  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesService],
})
export class FavoritesModule {}
