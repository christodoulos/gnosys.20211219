import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    lowercase: true,
    validate: validator.isEmail,
    maxlength: 256,
    minlength: 6,
    required: [true, 'BLANK_EMAIL'],
    unique: true,
  })
  email: string;

  @Prop({ maxlength: 1024, minlength: 8, required: [true, 'BLANK_PASSWORD'] })
  password: string;

  @Prop({ required: [true, 'BLANK_FIRST_NAME'] })
  firstName: string;

  @Prop({ required: [true, 'BLANK_LAST_NAME'] })
  lastName: string;

  @Prop({ default: ['user'] })
  roles: [string];

  @Prop({ validate: validator.isUUID })
  verification: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: Date.now })
  verificationExpires: Date;

  @Prop({ default: 0 })
  loginAttempts: number;

  @Prop({ default: Date.now })
  blockExpires: Date;
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

UserSchema.virtual('uid').get(function () {
  return this._id.toHexString();
});

UserSchema.virtual('displayName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
    delete ret.id;
  },
});

UserSchema.set('toObject', { virtuals: true });

UserSchema.set('timestamps', true);
UserSchema.set('versionKey', false);
