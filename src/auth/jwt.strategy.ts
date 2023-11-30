import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTConstants } from "src/keys/JWT";

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:JWTConstants.secret 
        });
    }

    async validate(payload:any){
        return  { email: payload.email, id: payload._id }
    }
}