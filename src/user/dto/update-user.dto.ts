import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User`s old password for check',
    example: 'user123',
  })
  @MinLength(1)
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'User`s new password', example: 'user111' })
  @MinLength(1)
  @IsString()
  newPassword: string;
}
