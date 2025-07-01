import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist`s name', example: 'Louna' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Artist has the grammy', example: 'true' })
  @IsBoolean()
  grammy: boolean;
}
