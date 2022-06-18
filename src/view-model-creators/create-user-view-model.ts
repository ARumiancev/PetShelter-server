import { User, UserDocument } from '../models/user-model';

export type UserViewModel = Omit<User, 'password' | 'cartItems'> & {
  id: string,
};

const createUserViewModel = (userDoc: UserDocument): UserViewModel => ({
  id: userDoc._id.toString(),
  email: userDoc.email,
  role: userDoc.role,
  name: userDoc.name,
  surname: userDoc.surname,
  img: userDoc.img,
  createdAt: userDoc.createdAt,
  updatedAt: userDoc.updatedAt,
});

export default createUserViewModel;
