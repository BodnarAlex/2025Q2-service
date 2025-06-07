import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
