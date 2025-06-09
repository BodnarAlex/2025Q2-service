import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'track' })
export class Track {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true, default: null })
  albumId: string | null;

  @Column({ type: 'int', default: 0 })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
