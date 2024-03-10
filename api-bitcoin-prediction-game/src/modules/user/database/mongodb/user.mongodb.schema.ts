import { Document, model, Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
  allTimeScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = Document & User;

const userSchema = new Schema<User>(
  {
    email: { type: String, unique: true },
    password: { type: String, minlength: 8 },
    // TODO - Move allTimeScore into Player schema and link it to the user
    allTimeScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', userSchema);
