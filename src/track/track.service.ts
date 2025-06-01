import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4, validate as isUuid } from 'uuid';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
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
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const track = this.tracks.find((t: Track) => t.id === id);
    if (!track) throw new NotFoundException('Artist does not exist');
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const track = this.tracks.find((t: Track) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');

    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    return track;
  }

  remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const index = this.tracks.findIndex((u: Track) => u.id === id);
    if (index === -1) throw new NotFoundException('Track not found');
    this.tracks.splice(index, 1);
  }

  async nullifyArtistId(id: string) {
    for (const track of this.tracks) {
      if (track.artistId === id) {
        track.artistId = null;
      }
    }
  }

  async nullifyAlbum(id: string) {
    for (const track of this.tracks) {
      if (track.albumId === id) {
        track.albumId = null;
      }
    }
  }
}
