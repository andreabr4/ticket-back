import { IsString, IsNotEmpty } from "class-validator";

export class UsersDto {

    @IsString({message:'Name is not a string'})
    @IsNotEmpty({message:'Name is empty'})
    name:string

    @IsString({message:'Username is not a string'})
    username:string 
    
    @IsString({message: 'Surname is not a string'})
    surname:string

    @IsString({message:'Email is not a string'})
    @IsNotEmpty({message:'Email is empty'})
    email:string

    @IsString({message:'Password is not a string'})
    @IsNotEmpty({message:'Password is empty'})
    password:string
}
