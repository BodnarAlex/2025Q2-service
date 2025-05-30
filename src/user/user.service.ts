import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const time = Date.now();
    const newUser: User = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: randomUUID,
      version: 1,
      createdAt: time,
      updatedAt: time,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.filter((u: User) => u.id === String(id)).at(0);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.filter((u: User) => u.id === String(id)).at(0);
    user.password = updateUserDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((u: User) => u.id === String(id));
    this.users.splice(index, 1);
  }
}
