import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UsersDto } from './dto/users.dto/users.dto';
import { Resend } from 'resend';
import { EmailTemplate } from 'src/components/Signup';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel('user') private readonly userModel: Model<UserDocument>,
        private configService: ConfigService
        ) { }
    
    async createUser(user: UsersDto): Promise<User> {

        try {
            const newUser = await this.userModel.create(user);
            const resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));

            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: [newUser.email],
                subject: `Welcome ${newUser.name} to RowONE`,
                react: EmailTemplate({ name: newUser.name, surname: newUser.surname}),
            });
            return newUser; 
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Error al crear el usuario');
        }
    }
    
    async getUser(email: string ): Promise<any> {
        return this.userModel.findOne({email:email});
    }
}
