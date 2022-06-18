import {
  Schema,
  Model,
  Types,
  Document,
  model,
} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type User = {
  email: string,
  password: string,
  role: 'user' | 'admin',
  name?: string,
  surname?: string,
  img?: string,
  createdAt: string,
  updatedAt: string,
};

export type UserProps = Omit<User, 'createdAt' | 'updatedAt' | 'role'>;

type UserModelType = Model<User, unknown>;

export type UserDocument = Document<Types.ObjectId, unknown, User> & User & {
  _id: Types.ObjectId;
};

const userSchema: Schema = new Schema<User, UserModelType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  surname: String,
  img: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

userSchema.plugin(uniqueValidator);

const UserModel = model<User, UserModelType>('User', userSchema);

export default UserModel;
