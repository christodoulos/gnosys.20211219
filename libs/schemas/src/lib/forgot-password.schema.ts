import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema()
export class ForgotPassword {
  @Prop({
    required: [true, 'Email is blank'],
    validate: validator.isEmail,
  })
  email: string;

  @Prop({ required: true, validate: validator.isUUID })
  verification: string;

  @Prop({ default: false })
  firstUsed: boolean;

  @Prop({ default: false })
  finalUsed: boolean;

  @Prop({ required: true })
  expires: Date;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  browser: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  ipChanged: string;

  @Prop()
  browserChanged: string;

  @Prop()
  countryChanged: string;
}

export const ForgotPasswordSchema =
  SchemaFactory.createForClass(ForgotPassword);

ForgotPasswordSchema.set('timestamps', true);
ForgotPasswordSchema.set('versionKey', false);
