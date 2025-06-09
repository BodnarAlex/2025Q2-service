import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Favorite, Track, Album])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
