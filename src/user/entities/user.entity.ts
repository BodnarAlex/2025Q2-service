import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseInt(value, 10) : value,
    },
  })
  createdAt: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) =>
        typeof value === 'string' ? parseInt(value, 10) : value,
    },
  })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    if (!this.version) this.version = 1;
  }
}
