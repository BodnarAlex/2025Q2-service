import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('track')
  @ApiOperation({ summary: 'Find all favorites tracks' })
  @ApiResponse({ status: 200, description: 'favorites tracks was founded' })
  findTracks() {
    return this.favoritesService.findTracks();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Find a favorite track' })
  @ApiParam({ name: 'id', description: 'favorite track`s UUID' })
  @ApiResponse({ status: 201, description: 'favorite track was founded' })
  createTrack(@Param('id') id: string) {
    return this.favoritesService.createTrack(id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete favorite track' })
  @ApiParam({ name: 'id', description: 'favorite track`s UUID' })
  @ApiResponse({ status: 204, description: 'favorite track was daleted' })
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Get('album')
  @ApiOperation({ summary: 'Find all favorites albums' })
  @ApiResponse({ status: 200, description: 'favorites albums was founded' })
  findAlbums() {
    return this.favoritesService.findAlbums();
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Find a favorite album' })
  @ApiParam({ name: 'id', description: 'favorite album`s UUID' })
  @ApiResponse({ status: 201, description: 'favorite album was founded' })
  createAlbum(@Param('id') id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete favorite album' })
  @ApiParam({ name: 'id', description: 'favorite album`s UUID' })
  @ApiResponse({ status: 204, description: 'favorite album was daleted' })
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Get('artist')
  @ApiOperation({ summary: 'Find all favorites artist' })
  @ApiResponse({ status: 200, description: 'favorites artist was founded' })
  findArtists() {
    return this.favoritesService.findArtists();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Find a favorite artist' })
  @ApiParam({ name: 'id', description: 'favorite artist`s UUID' })
  @ApiResponse({ status: 201, description: 'favorite artist was founded' })
  create(@Param('id') id: string) {
    return this.favoritesService.createArtist(id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete favorite artist' })
  @ApiParam({ name: 'id', description: 'favorite artist`s UUID' })
  @ApiResponse({ status: 204, description: 'favorite artist was daleted' })
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
