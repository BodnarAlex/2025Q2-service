import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable({
    name: 'favorites_artists',
    joinColumn: {
      name: 'favoriteId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artistId',
      referencedColumnName: 'id',
    },
  })
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable({
    name: 'favorites_albums',
    joinColumn: {
      name: 'favoriteId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'albumId',
      referencedColumnName: 'id',
    },
  })
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable({
    name: 'favorites_tracks',
    joinColumn: {
      name: 'favoriteId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'trackId',
      referencedColumnName: 'id',
    },
  })
  tracks: Track[];
}
