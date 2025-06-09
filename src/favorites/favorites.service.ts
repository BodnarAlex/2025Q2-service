import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favsRepo: Repository<Favorite>,

    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,

    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
  ) {}

  async getFavorites(): Promise<Favorite> {
    let favorites = await this.favsRepo.findOne({ where: {} });
    if (!favorites) {
      favorites = this.favsRepo.create({
        albums: [],
        tracks: [],
        artists: [],
      });
      await this.favsRepo.save(favorites);
    }
    return favorites;
  }

  async createTrack(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const track = await this.trackRepo.findOneBy({ id });
    if (!track) throw new UnprocessableEntityException('Track not found');

    const favorites = await this.getFavorites();
    if (!favorites.tracks.includes(id)) {
      favorites.tracks.push(id);
      await this.favsRepo.save(favorites);
    }

    return track;
  }

  async createAlbum(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const album = await this.albumRepo.findOneBy({ id });
    if (!album) throw new UnprocessableEntityException('Album not found');

    const favorites = await this.getFavorites();
    if (!favorites.albums.includes(id)) {
      favorites.albums.push(id);
      await this.favsRepo.save(favorites);
    }

    return album;
  }

  async createArtist(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) throw new UnprocessableEntityException('Artist not found');

    const favorites = await this.getFavorites();
    if (!favorites.artists.includes(id)) {
      favorites.artists.push(id);
      await this.favsRepo.save(favorites);
    }
    return artist;
  }

  findAll() {
    return this.favsRepo.findOne({ where: {} });
  }

  async findTracks() {
    const favorites = await this.favsRepo.findOne({ where: {} });
    return favorites?.tracks || [];
  }

  async findAlbums() {
    const favorites = await this.favsRepo.findOne({ where: {} });
    return favorites?.albums || [];
  }

  async findArtists() {
    const favorites = await this.favsRepo.findOne({ where: {} });
    return favorites?.artists || [];
  }

  async removeTrack(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');
    const favorites = await this.getFavorites();

    const index = favorites.tracks.indexOf(id);
    if (index === -1) throw new NotFoundException('Track is not favorite');

    favorites.tracks.slice(index, 1);
    await this.favsRepo.save(favorites);
  }

  async removeAlbum(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const favorites = await this.getFavorites();

    const index = favorites.albums.indexOf(id);
    if (index === -1) throw new NotFoundException('Album is not favorite');

    favorites.albums.slice(index, 1);
    await this.favsRepo.save(favorites);
  }

  async removeArtist(id: string) {
    if (!isUuid(id)) throw new BadRequestException('Id is not uuid');

    const favorites = await this.getFavorites();

    const index = favorites.artists.indexOf(id);
    if (index === -1) throw new NotFoundException('Artist is not favorite');

    favorites.artists.slice(index, 1);
    await this.favsRepo.save(favorites);
  }
}
