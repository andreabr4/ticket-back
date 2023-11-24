import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { UsersDto } from './dto/users.dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async createUser(
        @Body() user: UsersDto,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hashedPassword
        const result = await this.usersService.createUser(user);
        return result;
    }
}