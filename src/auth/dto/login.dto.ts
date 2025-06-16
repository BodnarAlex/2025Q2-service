import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User for login', example: 'user111' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Password for login', example: 'password111' })
  @IsString()
  password: string;
}
