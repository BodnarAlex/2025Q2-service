import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackRepository } from './track.repository';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackService],
})
export class TrackModule {}
