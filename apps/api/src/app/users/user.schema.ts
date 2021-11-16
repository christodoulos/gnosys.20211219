import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  uid: string;

  @Prop({
    lowercase: true,
    validate: validator.isEmail,
    maxlength: 256,
    minlength: 6,
    required: [true, 'BLANK_EMAIL'],
  })
  email: string;

  @Prop({ maxlength: 1024, minlength: 8, required: [true, 'BLANK_PASSWORD'] })
  password: string;

  @Prop({ required: [true, 'BLANK_GIVEN_NAME'] })
  givenName: string;

  @Prop({ required: [true, 'BLANK_FAMILY_NAME'] })
  familyName: string;

  @Prop({ default: false })
  emailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
