import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'User for signup', example: 'user111' })
  @IsString()
  login: string;

  @ApiProperty({ description: 'Password for signup', example: 'password111' })
  @IsString()
  password: string;
}
