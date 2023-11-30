import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UsersDto {
    
    @IsString({message:'Name is not a string'})
    @IsNotEmpty({message:'Name is empty'})
    @ApiProperty()
    name:string
    
    
    @IsString({message: 'Surname is not a string'})
    @ApiProperty()
    surname:string

    @IsString({message:'Email is not a string'})
    @IsNotEmpty({message:'Email is empty'})
    @ApiProperty()
    email:string

    @IsString({message:'Password is not a string'})
    @IsNotEmpty({message:'Password is empty'})
    @ApiProperty()
    password:string
}
