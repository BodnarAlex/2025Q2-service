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
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    private readonly favsRepo: FavoritesRepository,
  ) {}

  async createTrack(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    let track;
    try {
      track = await this.trackService.findOne(id);
    } catch {
      throw new UnprocessableEntityException('Album not found');
    }

    this.favsRepo.addTrack(track);
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

    this.favsRepo.addAlbum(album);
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

    this.favsRepo.addArtist(artist);
    return artist;
  }

  findAll() {
    return this.favsRepo.getAll();
  }

  findTracks() {
    return this.favsRepo.getTracks();
  }

  findAlbums() {
    return this.favsRepo.getAlbums();
  }

  findArtists() {
    return this.favsRepo.getArtists();
  }

  removeTrack(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const index = this.favsRepo.getIndexTrackById(id);
    if (index === -1) throw new NotFoundException('Track is not favorite');

    this.favsRepo.removeTrack(id);
  }

  removeAlbum(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const index = this.favsRepo.getIndexAlbumById(id);
    if (index === -1) throw new NotFoundException('Album is not favorite');

    this.favsRepo.removeAlbum(id);
  }

  removeArtist(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const index = this.favsRepo.getIndexArtistById(id);
    if (index === -1) throw new NotFoundException('Artist is not favorite');

    this.favsRepo.removeArtist(id);
  }

  async nullifyFavsAlbumId(id: string) {
    this.favsRepo.nullifyAlbum(id);
  }

  async nullifyFavsArtistId(id: string) {
    this.favsRepo.nullifyArtist(id);
  }

  async nullifyFavsTrackId(id: string) {
    this.favsRepo.nullifyTrack(id);
  }
}
