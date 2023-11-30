import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../users/users.schema"
import { JWTConstants } from "src/keys/JWT";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: JWTConstants.secret,
    signOptions: { expiresIn: '1300s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [AuthService, UsersService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }