import { Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackRepository {
  private tracks: Track[] = [];

  create(track: Track) {
    this.tracks.push(track);
    return track;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track | undefined {
    return this.tracks.find((t) => t.id === id);
  }

  update(updatedTrack: Track): Track | undefined {
    const index = this.tracks.findIndex((t) => t.id === updatedTrack.id);
    if (index !== -1) this.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  delete(id: string): void {
    this.tracks = this.tracks.filter((t) => t.id !== id);
  }

  nullifyArtistId(id: string): void {
    for (const track of this.tracks) {
      if (track.artistId === id) track.artistId = null;
    }
  }

  nullifyAlbumId(id: string): void {
    for (const track of this.tracks) {
      if (track.albumId === id) track.albumId = null;
    }
  }
}
