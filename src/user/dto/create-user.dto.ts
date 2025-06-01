import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  @IsString()
  login: string;

  @MinLength(1)
  @IsString()
  password: string;
}
