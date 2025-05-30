import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException('Body does not contain required fields');

    const time = Date.now();
    const newUser: User = {
      login: createUserDto.login,
      password: createUserDto.password,
      id: uuid(),
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

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');
    const user = this.users.filter((u: User) => u.id === id).at(0);
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');

    const user = this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    if (
      !updateUserDto.oldPassword ||
      updateUserDto.oldPassword !== user.password
    )
      throw new ForbiddenException();
    user.password = updateUserDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');
    const index = this.users.findIndex((u: User) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
  }
}
