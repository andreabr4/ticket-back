import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "../users/users.schema"
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1300s' },
    }),
    inject: [ConfigService],
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [AuthService, UsersService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }