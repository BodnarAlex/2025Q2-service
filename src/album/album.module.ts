import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { AlbumRepository } from './album.repository';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavoritesModule)],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}
