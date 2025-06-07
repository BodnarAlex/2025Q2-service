import { Column, Entity } from 'typeorm';

@Entity()
export class Favorite {
  @Column()
  artists: string[] = [];
  @Column()
  albums: string[] = [];
  @Column()
  tracks: string[] = [];
}
