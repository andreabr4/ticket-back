import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {

    @IsString({message:'Email is not a string'})
    @IsNotEmpty({message:'Email is empty'})
    username:string

    @IsNotEmpty({message:'Password is empty'})
    @IsString({message:'Password is not a string'})
    password:string
}
