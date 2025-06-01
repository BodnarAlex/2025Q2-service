import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4, validate as isUuid } from 'uuid';

import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    if (
      typeof createAlbumDto.name !== 'string' &&
      typeof createAlbumDto.year !== 'string'
    )
      throw new BadRequestException('Body does not contain required fields');

    const artistId = !!createAlbumDto.artistId ? createAlbumDto.artistId : null;
    const newAlbum = new Album({
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: artistId,
    });
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }
  findOne(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const albums = this.albums.find((a: Album) => a.id === id);
    if (!albums) throw new NotFoundException('Album does not exist');
    return albums;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    if (
      typeof updateAlbumDto.name !== 'string' &&
      typeof updateAlbumDto.year !== 'string'
    )
      throw new BadRequestException('Body does not contain required fields');
    const album = this.albums.find((a: Album) => a.id === id);
    if (!album) throw new NotFoundException('Album not found');

    album.artistId = updateAlbumDto.artistId;
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    return album;
  }

  remove(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const index = this.albums.findIndex((u: Album) => u.id === id);
    if (index === -1) throw new NotFoundException('Album not found');
    this.albums.splice(index, 1);
  }
}
