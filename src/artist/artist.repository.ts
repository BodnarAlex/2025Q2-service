import { Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository {
  private artists: Artist[] = [];

  create(artist: Artist) {
    this.artists.push(artist);
    return Artist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findById(id: string): Artist | undefined {
    return this.artists.find((t) => t.id === id);
  }

  update(updatedArtist: Artist): Artist | undefined {
    const index = this.artists.findIndex((t) => t.id === updatedArtist.id);
    if (index !== -1) this.artists[index] = updatedArtist;
    return updatedArtist;
  }

  delete(id: string): void {
    this.artists = this.artists.filter((t) => t.id !== id);
  }
}
