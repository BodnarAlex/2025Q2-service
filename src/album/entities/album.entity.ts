import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({type: 'uuid', nullable: true})
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
