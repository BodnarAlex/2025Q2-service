import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4, validate as isUuid } from 'uuid';

import { Album } from './entities/album.entity';
import { TrackService } from 'src/track/track.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (
      typeof createAlbumDto.name !== 'string' ||
      typeof createAlbumDto.year !== 'number'
    )
      throw new BadRequestException('Body does not contain required fields');

    const artistId = !!createAlbumDto.artistId ? createAlbumDto.artistId : null;
    const newAlbum = new Album({
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artistId,
    });
    const createAlbum = await this.albumRepo.save(newAlbum);
    return createAlbum;
  }

  async findAll() {
    return await this.albumRepo.find();
  }
  async findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const albums = await this.albumRepo.findOneBy({ id });
    if (!albums) throw new NotFoundException('Album does not exist');
    return albums;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    if (
      typeof updateAlbumDto.name !== 'string' ||
      typeof updateAlbumDto.year !== 'number'
    )
      throw new BadRequestException('Body does not contain required fields');
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');

    album.artistId = updateAlbumDto.artistId;
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    this.albumRepo.save(album);
    return album;
  }

  async remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    await this.favoritesService.nullifyFavsAlbumId(id);
    await this.trackService.nullifyAlbum(id);
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');
    await this.albumRepo.delete(id);
  }

  async nullifyArtistId(id: string) {
    await this.albumRepo.update({ artistId: id }, { artistId: null });
  }
}
