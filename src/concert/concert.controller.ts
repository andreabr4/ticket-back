import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post('create')
  async createConcert(@Body() concert: any) {
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

  @Delete(':musician')
  async deleteConcert(@Param('musician') musician:string){
      return await this.concertService.deleteConcert(musician)
  }

  @Put('edit')
  async updateConcert(@Body() body:any){
      return await this.concertService.updateConcert(body)
  }
}
