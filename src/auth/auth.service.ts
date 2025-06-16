import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(signupDto: SignupDto) {
    if (!signupDto.login || !signupDto.password)
      throw new BadRequestException('Body does not contain required fields');

    const user = await this.usersService.findByLogin(signupDto.login);
    console.log('users:', user);

    if (!user)
      throw new ForbiddenException('User with this login does not exist');
    console.log('password:', signupDto.password);
    console.log('user.password:', user.password);
    const isMatchPassword = await bcrypt.compare(
      signupDto.password,
      user.password,
    );
    if (!isMatchPassword) throw new UnauthorizedException('Incorrect password');

    const payload = { sub: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(loginDto: LoginDto) {
    return await this.usersService.create({
      login: loginDto.login,
      password: loginDto.password,
    });
  }
}
