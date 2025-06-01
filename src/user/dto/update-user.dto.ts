import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(1)
  @IsString()
  oldPassword: string;

  @MinLength(1)
  @IsString()
  newPassword: string;
}
