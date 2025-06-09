import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { validate as isUuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../favorites/entities/favorite.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,

    @InjectRepository(Favorite)
    private readonly favsRepo: Repository<Favorite>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    if (
      typeof createArtistDto.name !== 'string' ||
      typeof createArtistDto.grammy !== 'boolean'
    )
      throw new BadRequestException('Body does not contain required fields');

    const newArtist = new Artist({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    const createdArtist = await this.artistRepo.save(newArtist);
    return createdArtist;
  }

  async findAll() {
    return await this.artistRepo.find();
  }

  async findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist does not exist');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    if (
      typeof updateArtistDto.name !== 'string' ||
      typeof updateArtistDto.grammy !== 'boolean'
    )
      throw new BadRequestException('Body does not contain required fields');
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist not found');

    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;

    const updateArtist = await this.artistRepo.save(artist);
    return updateArtist;
  }

  async remove(id: string) {
    const [favorites] = await this.favsRepo.find();

    if (favorites && favorites.artists) {
      favorites.artists = favorites.artists.filter(
        (artistId) => artistId !== id,
      );
      await this.favsRepo.save(favorites);

      if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
      const artist = await this.artistRepo.findOneBy({ id });
      if (!artist) throw new NotFoundException('Artist not found');
      await this.artistRepo.delete(id);
    }
  }
}
