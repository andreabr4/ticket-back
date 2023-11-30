import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsString({message:'Email is not a string'})
    @IsNotEmpty({message:'Email is empty'})
    email:string

    @ApiProperty()
    @IsNotEmpty({message:'Password is empty'})
    @IsString({message:'Password is not a string'})
    password:string
}   
