import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4, validate as isUuid } from 'uuid';
import { Track } from './entities/track.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly trackRepo: TrackRepository,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    if (
      typeof createTrackDto.name !== 'string' ||
      typeof createTrackDto.duration !== 'number'
    )
      throw new BadRequestException('Body does not contain required fields');

    const artistId = !!createTrackDto.artistId ? createTrackDto.artistId : null;
    const albumId = !!createTrackDto.albumId ? createTrackDto.albumId : null;

    const newTrack = new Track({
      id: v4(),
      name: createTrackDto.name,
      artistId: artistId,
      albumId: albumId,
      duration: createTrackDto.duration,
    });
    return this.trackRepo.create(newTrack);
  }

  findAll() {
    return this.trackRepo.findAll();
  }

  findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const track = this.trackRepo.findById(id);
    if (!track) throw new NotFoundException('Artist does not exist');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const track = this.trackRepo.findById(id);
    if (!track) throw new NotFoundException('Track not found');

    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;

    this.trackRepo.update(track);
    return track;
  }

  async remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    await this.favoritesService.nullifyFavsTrackId(id);

    const track = this.trackRepo.findById(id);
    if (!track) throw new NotFoundException('Track not found');
    this.trackRepo.delete(id);
  }

  async nullifyArtistId(id: string) {
    this.trackRepo.nullifyArtistId(id);
  }

  async nullifyAlbum(id: string) {
    this.trackRepo.nullifyAlbumId(id);
  }
}
