
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

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


}


export const UserSchema = SchemaFactory.createForClass(User);