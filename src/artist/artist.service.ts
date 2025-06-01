import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4, validate as isUuid } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    if (
      typeof createArtistDto.name !== 'string' ||
      typeof createArtistDto.grammy !== 'boolean'
    )
      throw new BadRequestException('Body does not contain required fields');

    const newArtist = new Artist({
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    this.artists.push(newArtist);
    return instanceToPlain(newArtist);
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const artist = this.artists.find((a: Artist) => a.id === id);
    if (!artist) throw new NotFoundException('Artist does not exist');
    return instanceToPlain(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    if (
      typeof updateArtistDto.name !== 'string' ||
      typeof updateArtistDto.grammy !== 'boolean'
    )
      throw new BadRequestException('Body does not contain required fields');
    const artist = this.findOne(id);
    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;
    return instanceToPlain(artist);
  }

  remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const index = this.artists.findIndex((u: Artist) => u.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');
    this.artists.splice(index, 1);
  }
}
