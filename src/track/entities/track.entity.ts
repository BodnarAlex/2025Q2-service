import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
