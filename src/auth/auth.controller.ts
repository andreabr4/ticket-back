import { Controller, Request, Post, UseGuards, Body, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from 'src/users/dto/users-login.dto/users-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    // @UseGuards(AuthGuard('local'))
    @Post('login')
    async login( @Body() user: UserLoginDto) {
        let login = await this.authService.validateUser(user.email, user.password);

        if (!login){
            throw new UnauthorizedException
        }
        else{
            return login
        }
    }
}
