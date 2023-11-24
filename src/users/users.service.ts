import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UsersDto } from './dto/users.dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(user: UsersDto): Promise<User> {
        return this.userModel.create(user);
    }
    async getUser(query: object ): Promise<User> {
        return this.userModel.findOne(query);
    }
}
