import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavoritesRepository {
  private favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  getAll() {
    return {
      artists: this.favorites.artists,
      albums: this.favorites.albums,
      tracks: this.favorites.tracks,
    };
  }

  getTracks() {
    return this.favorites.tracks;
  }

  getAlbums() {
    return this.favorites.albums;
  }

  getArtists() {
    return this.favorites.artists;
  }

  getIndexTrackById(id: string) {
    return this.favorites.tracks.findIndex((a) => a.id === id);
  }

  getIndexAlbumById(id: string) {
    return this.favorites.albums.findIndex((a) => a.id === id);
  }

  getIndexArtistById(id: string) {
    return this.favorites.artists.findIndex((a) => a.id === id);
  }

  addTrack(track: Track) {
    if (!this.favorites.tracks.find((t) => t.id === track.id)) {
      this.favorites.tracks.push(track);
    }
  }

  addAlbum(album: Album) {
    if (!this.favorites.albums.find((a) => a.id === album.id)) {
      this.favorites.albums.push(album);
    }
  }

  addArtist(artist: Artist) {
    if (!this.favorites.artists.find((a) => a.id === artist.id)) {
      this.favorites.artists.push(artist);
    }
  }

  removeTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter((t) => t.id !== id);
  }

  removeAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter((a) => a.id !== id);
  }

  removeArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter((a) => a.id !== id);
  }

  nullifyTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  nullifyAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }

  nullifyArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
