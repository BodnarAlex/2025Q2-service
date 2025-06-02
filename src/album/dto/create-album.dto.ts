import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Album`s name', example: 'Album 5' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Album`s year created', example: '2015' })
  @IsInt()
  year: number;

  @ApiProperty({
    description: 'Album`s artist id',
    example: 'b8551d1d-ab4b-4b04-9ff8-834b724a0bf8',
    nullable: true,
    type: String,
  })
  @IsOptional()
  artistId: string | null;
}
