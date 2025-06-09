import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', array: true, default: [] })
  artists: string[];

  @Column({ type: 'text', array: true, default: [] })
  albums: string[];

  @Column({ type: 'text', array: true, default: [] })
  tracks: string[];
}
