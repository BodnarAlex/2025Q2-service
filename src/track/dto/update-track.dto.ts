import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
export class UpdateTrackDto {
  @ApiProperty({
    description: 'track`s title',
    example: 'song1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Track`s artist id',
    example: 'b8551d1d-ab4b-4b04-9ff8-834b724a0bf7',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  artistId?: string | null;

  @ApiProperty({
    description: 'Track`s album id',
    example: 'b8551d1d-ab4b-4b04-9ff8-834b724a0bf8',
    nullable: true,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  albumId?: string | null;

  @ApiProperty({
    description: 'Duration of track',
    example: 10,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  duration?: number;
}
