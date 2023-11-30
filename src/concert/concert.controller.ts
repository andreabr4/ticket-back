import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConcertDto } from './dto/concert.dto/concert.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('concert')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createConcert(@Body() concert: ConcertDto) {
    return await this.concertService.createConcert(concert);
  }

  @Get('concerts')
  async showConcerts() {
    return await this.concertService.showConcerts();
  }

  @Get('genre/:genre')
  async showConcertGenre(@Param('genre') genre: string) {
    return await this.concertService.showConcertGenre(genre);
  }

  @Get('genres')
  async getGenres() {
      return await this.concertService.getDistinctGenres();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':musician')
  async deleteConcert(@Param('musician') musician:string){
      return await this.concertService.deleteConcert(musician)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async updateConcert(@Body() body:any){
      return await this.concertService.updateConcert(body)
  }
}
