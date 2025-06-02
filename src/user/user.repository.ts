import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  save(user: User): User {
    this.users.push(user);
    return user;
  }

  update(user: User): User {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) this.users[index] = user;
    return user;
  }

  delete(id: string): void {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
