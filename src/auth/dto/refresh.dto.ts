import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    description: 'refreshToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MDAzY2NhMC1kYzE2LTQxOWEtOTEwYy1hYjM4YWY4N2U5MmUiLCJsb2dpbiI6InBhc3N3b3JkMSIsImlhdCI6MTc1MDA1OTI3NCwiZXhwIjoxNzUwMDYyODc0fQ.mpvCKxSPQuYJ4qbsebolAiesXAtaGnI5b3JZr25KeYk',
  })
  @IsString()
  refreshToken: string;
}
