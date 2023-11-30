import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsDate,
  isObject,
  IsDateString,
} from 'class-validator';

export class Place {
  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  city: string;

  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  country: string;

  @IsNumber()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  longitude: number;
}

export class Description {
  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  en: string;

  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  es: string;
}

export class ConcertDto {
  @IsObject()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  place: Place;

  @IsDateString()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  date: string;

  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  genre: string;

  @IsNumber()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  price: number;

  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  musician: string;

  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  image: string;

  @IsNumber()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  stock: number;

  @IsObject()
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  description: Description;

  @IsString({ message: 'It is not a string' })
  @IsNotEmpty({ message: 'It is empty' })
  @ApiProperty()
  spotifyID: string;
}
