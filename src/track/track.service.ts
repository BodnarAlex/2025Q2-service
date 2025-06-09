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
import { FavoritesService } from '../favorites/favorites.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
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
    const createTrack = await this.trackRepo.save(newTrack);
    return createTrack;
  }

  async findAll() {
    return this.trackRepo.find();
  }

  async findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const track = await this.trackRepo.findOneBy({ id });
    if (!track) throw new NotFoundException('Artist does not exist');
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const track = await this.trackRepo.findOneBy({ id });
    if (!track) throw new NotFoundException('Track not found');

    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;

    this.trackRepo.save(track);
    return track;
  }

  async remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    await this.favoritesService.nullifyFavsTrackId(id);

    const track = await this.trackRepo.findOneBy({ id });
    if (!track) throw new NotFoundException('Track not found');
    await this.trackRepo.delete(id);
  }

  async nullifyArtistId(id: string) {
    await this.trackRepo.update({ artistId: id }, { artistId: null });
  }

  async nullifyAlbum(id: string) {
    await this.trackRepo.update({ albumId: id }, { albumId: null });
  }
}
