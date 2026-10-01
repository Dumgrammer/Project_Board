import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema.js';
import mongoose from 'mongoose';

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  members: mongoose.Schema.Types.ObjectId[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
