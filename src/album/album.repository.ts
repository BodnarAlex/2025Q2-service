import { Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumRepository {
  private albums: Album[] = [];

  create(album: Album) {
    this.albums.push(album);
    return album;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findById(id: string): Album | undefined {
    return this.albums.find((t) => t.id === id);
  }

  update(updatedAlbum: Album): Album | undefined {
    const index = this.albums.findIndex((t) => t.id === updatedAlbum.id);
    if (index !== -1) this.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  delete(id: string): void {
    this.albums = this.albums.filter((t) => t.id !== id);
  }

  nullifyArtistId(id: string): void {
    for (const album of this.albums) {
      if (album.artistId === id) album.artistId = null;
    }
  }
}
