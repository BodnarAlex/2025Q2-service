import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as isUuid } from 'uuid';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../favorites/entities/favorite.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,

    @InjectRepository(Favorite)
    private readonly favsRepo: Repository<Favorite>,
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
    const [favorites] = await this.favsRepo.find();

    if (favorites && favorites.tracks) {
      favorites.tracks = favorites.tracks.filter(
        (trackId) => trackId.id !== id,
      );
      await this.favsRepo.save(favorites);

      const track = await this.trackRepo.findOneBy({ id });
      if (!track) throw new NotFoundException('Track not found');
      await this.trackRepo.remove(track);
    }
  }
}
