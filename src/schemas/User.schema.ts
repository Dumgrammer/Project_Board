
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { UserSettings } from './UserSettings.schema.js'
import { Post } from './Post.schema.js'
import mongoose from 'mongoose'

@Schema()
export class User {
    @Prop({ required: true })
    firstname: string;

    @Prop({ required: false })
    middlename?: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ unique: true })
    password: string

    @Prop({ required: false })
    profilePic?: string;

    //One to one
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;

    //One to Many
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];

}


export const UserSchema = SchemaFactory.createForClass(User);