import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User`s login', example: 'user123' })
  @MinLength(1)
  @IsString()
  login: string;

  @ApiProperty({ description: 'User`s password', example: 'user123' })
  @MinLength(1)
  @IsString()
  password: string;
}
