import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { validate as isUuid } from 'uuid';

@Injectable()
export class FavoritesService {
  private favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  async createTrack(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    let track;
    try {
      track = await this.trackService.findOne(id);
    } catch {
      throw new UnprocessableEntityException('Album not found');
    }

    if (!this.favs.tracks.find((t) => t.id === id)) {
      this.favs.tracks.push(track);
    }

    return track;
  }

  async createAlbum(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    let album;
    try {
      album = await this.albumService.findOne(id);
    } catch {
      throw new UnprocessableEntityException('Album not found');
    }

    if (!this.favs.albums.find((a) => a.id === id)) {
      this.favs.albums.push(album);
    }

    return album;
  }

  async createArtist(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    let artist;
    try {
      artist = await this.artistService.findOne(id);
    } catch {
      throw new UnprocessableEntityException('Artist not found');
    }

    if (!this.favs.artists.find((a) => a.id === id)) {
      this.favs.artists.push(artist);
    }

    return artist;
  }

  findAll() {
    return {
      artists: this.favs.artists,
      albums: this.favs.albums,
      tracks: this.favs.tracks,
    };
  }

  findTracks() {
    return this.favs.tracks;
  }

  findAlbums() {
    return this.favs.albums;
  }

  findArtists() {
    return this.favs.artists;
  }

  removeTrack(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const index = this.favs.tracks.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException('Track not found');

    this.favs.tracks.splice(index, 1);
  }

  removeAlbum(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const index = this.favs.albums.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException('Album not found');

    this.favs.albums.splice(index, 1);
  }

  removeArtist(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const index = this.favs.artists.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');

    this.favs.artists.splice(index, 1);
  }

  async nullifyFavsAlbumId(id: string) {
    this.favs.albums = this.favs.albums.filter((album) => album.id !== id);
  }

  async nullifyFavsArtistId(id: string) {
    this.favs.artists = this.favs.artists.filter((artist) => artist.id !== id);
  }

  async nullifyFavsTrackId(id: string) {
    this.favs.tracks = this.favs.tracks.filter((track) => track.id !== id);
  }
}
