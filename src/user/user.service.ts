import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4, validate } from 'uuid';
import { instanceToPlain } from 'class-transformer';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException('Body does not contain required fields');

    const time = Date.now();
    const newUser = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      id: v4(),
      version: 1,
      createdAt: time,
      updatedAt: time,
    });
    this.userRepo.save(newUser);
    return instanceToPlain(newUser);
  }

  findAll() {
    return this.userRepo.findAll().map((user: User) => instanceToPlain(user));
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');
    const user = this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User does not exist');
    return instanceToPlain(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');

    if (!updateUserDto.newPassword || !updateUserDto.oldPassword)
      throw new BadRequestException('Body does not contain required fields');

    const user = this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.oldPassword !== user.password)
      throw new ForbiddenException('Incorrect old password');

    user.password = updateUserDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    this.userRepo.update(user);
    return instanceToPlain(user);
  }

  remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');
    const user = this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    this.userRepo.delete(id);
  }
}
