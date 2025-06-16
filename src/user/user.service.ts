import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validate } from 'uuid';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException('Body does not contain required fields');

    const time = Date.now();
    const cryptoPassword = await bcrypt.hash(
      createUserDto.password,
      Number(this.configService.get('CRYPT_SALT')),
    );
    const newUser = new User({
      login: createUserDto.login,
      password: cryptoPassword,
      createdAt: time,
      updatedAt: time,
    });

    await this.userRepo.save(newUser);
    return instanceToPlain(newUser);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map((user: User) => instanceToPlain(user));
  }

  async findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User does not exist');
    return instanceToPlain(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');

    if (!updateUserDto.newPassword || !updateUserDto.oldPassword)
      throw new BadRequestException('Body does not contain required fields');

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const isMatchPassword = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!isMatchPassword)
      throw new ForbiddenException('Incorrect old password');

    user.password = await bcrypt.hash(
      updateUserDto.newPassword,
      +this.configService.get('CRYPT_SALT'),
    );
    user.version++;
    user.updatedAt = Date.now();

    const updateUser = await this.userRepo.save(user);
    return instanceToPlain(updateUser);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Id is not uuid');
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepo.remove(user);
  }

  async findByLogin(login: string) {
    return await this.userRepo.findOne({ where: { login } });
  }
}
