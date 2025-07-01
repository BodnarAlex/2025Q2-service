import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as isUuid } from 'uuid';

import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../favorites/entities/favorite.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    @InjectRepository(Favorite)
    private readonly favsRepo: Repository<Favorite>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (
      typeof createAlbumDto.name !== 'string' ||
      typeof createAlbumDto.year !== 'number'
    )
      throw new BadRequestException('Body does not contain required fields');

    const artistId = !!createAlbumDto.artistId ? createAlbumDto.artistId : null;
    const newAlbum = new Album({
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
    await this.albumRepo.save(album);
    return album;
  }

  async remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const [favorites] = await this.favsRepo.find();

    if (favorites && favorites.albums) {
      favorites.albums = favorites.albums.filter((album) => album.id !== id);
      await this.favsRepo.save(favorites);
    }

    const album = await this.albumRepo.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');
    await this.albumRepo.delete(id);
  }
}
