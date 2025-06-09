import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'boolean', default: false })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
