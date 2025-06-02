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
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    private readonly albumRepo: AlbumRepository,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
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
    this.albumRepo.create(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albumRepo.findAll();
  }
  findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const albums = this.albumRepo.findById(id);
    if (!albums) throw new NotFoundException('Album does not exist');
    return albums;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    if (
      typeof updateAlbumDto.name !== 'string' ||
      typeof updateAlbumDto.year !== 'number'
    )
      throw new BadRequestException('Body does not contain required fields');
    const album = this.albumRepo.findById(id);
    if (!album) throw new NotFoundException('Album not found');

    album.artistId = updateAlbumDto.artistId;
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    this.albumRepo.update(album);
    return album;
  }

  async remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    await this.favoritesService.nullifyFavsAlbumId(id);
    await this.trackService.nullifyAlbum(id);
    const album = this.albumRepo.findById(id);
    if (!album) throw new NotFoundException('Album not found');
    this.albumRepo.delete(id);
  }

  async nullifyArtistId(id: string) {
    this.albumRepo.nullifyArtistId(id);
  }
}
