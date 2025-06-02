import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({ description: 'Artist`s name', example: 'Louna' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Artist has the grammy',
    example: 'true',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
