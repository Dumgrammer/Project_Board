import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schema.js';
import { UserSettings, UserSettingsSchema } from '../schemas/UserSettings.schema.js';

import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }, {
            name: UserSettings.name,
            schema: UserSettingsSchema
        }
        ])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})

export class UserModule { }  