import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryColumn()
  id: string;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  artists: string[] = [];

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  @Column()
  albums: string[] = [];

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  @Column()
  tracks: string[] = [];
}
