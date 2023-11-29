import { Controller, Request, Post, UseGuards, Body, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from 'src/users/dto/users-login.dto/users-login.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login( @Body() user: UserLoginDto) {
        console.log(user)
        let login = await this.authService.validateUser(user.email, user.password);

        if (!login){
            throw new UnauthorizedException
        }
        else{
            return login
        }
    }
}
