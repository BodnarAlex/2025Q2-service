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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    console.log(
      'REFRESH_TOKEN_SECRET',
      this.configService.get('JWT_SECRET_REFRESH_KEY'),
    );

    return { accessToken, refreshToken };
  }

  async login(signupDto: SignupDto) {
    if (!signupDto.login || !signupDto.password)
      throw new BadRequestException('Body does not contain required fields');

    const user = await this.usersService.findByLogin(signupDto.login);
    if (!user)
      throw new ForbiddenException('User with this login does not exist');

    const isMatchPassword = await bcrypt.compare(
      signupDto.password,
      user.password,
    );
    if (!isMatchPassword) throw new UnauthorizedException('Incorrect password');

    return this.signTokens(user.id, user.login);
  }

  async signUp(loginDto: LoginDto) {
    return await this.usersService.create({
      login: loginDto.login,
      password: loginDto.password,
    });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        clockTolerance: 0,
      });
      return this.signTokens(payload.userId, payload.login);
    } catch (err) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
