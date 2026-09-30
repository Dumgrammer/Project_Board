
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class UserSettings {
    @Prop({ required: false })
    receiveNotification?: boolean;

    @Prop({ required: false })
    receiveSms?: boolean;

    @Prop({ required: false })
    receiveEmail?: boolean;
}



export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);