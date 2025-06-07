import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4, validate as isUuid } from 'uuid';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
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
    await this.albumService.nullifyArtistId(id);
    await this.trackService.nullifyArtistId(id);
    await this.favoritesService.nullifyFavsArtistId(id);

    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist not found');
    await this.artistRepo.delete(id);
  }
}
