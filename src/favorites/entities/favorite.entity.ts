import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  artists: string[];

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  albums: string[];

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  tracks: string[];
}
