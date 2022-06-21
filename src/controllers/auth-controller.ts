import { Error } from 'mongoose';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel, { UserProps } from '../models/user-model';
import createUserViewModel, { UserViewModel } from '../view-model-creators/create-user-view-model';

type AuthResponseBody = {
  user: UserViewModel,
  token: string,
} | ErrorResponseBody;

export const checkEmail: RequestHandler<
  unknown,
  { valid: true } | ErrorResponseBody,
  unknown,
  { email?: string }
> = async (req, res) => {
  const { email } = req.query;

  try {
    if (email === undefined) {
      throw new Error('Please enter an email');
    }

    const userDoc = await UserModel.findOne({ email });
    if (userDoc !== null) {
      throw new Error('This email already is registered');
    }

    res.status(200).json({
      valid: true,
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Server error trying to identify the user',
    });
  }
};

export const login: RequestHandler<
  unknown,
  AuthResponseBody,
  Partial<UserProps>
> = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const userDoc = await UserModel.findOne({ email });
    if (userDoc === null) throw new Error(`Can't find a user with the email  '${email}' .`);

    const passwordIsCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!passwordIsCorrect) throw new Error('Wrong password');
    const token = jwt.sign({ email, role: userDoc.role }, config.token.secret);

    res.status(200).json({
      user: createUserViewModel(userDoc),
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Server error trying to connect',
    });
  }
};

export const register: RequestHandler<
  unknown,
  AuthResponseBody,
  Partial<UserProps>
> = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');

    const hashedPassword = bcrypt.hashSync(password, 5);
    const userDoc = await UserModel.create({ email, password: hashedPassword });

    const token = jwt.sign({ email, role: userDoc.role }, config.token.secret);

    res.status(201).json({
      user: createUserViewModel(userDoc),
      token: `Bearer ${token}`,
    });
  } catch (error) {
    let message = 'Server error trying register';

    if (error instanceof Error.ValidationError) {
      if (error.errors.email) {
        message = 'A user using this email already exists';
      }
    } else if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({
      error: message,
    });
  }
};

export const authenticate: RequestHandler<
  unknown,
  AuthResponseBody
> = async (req, res) => {
  try {
    if (req.tokenData === undefined) {
      throw new Error('There is no user information in checked crypted data Užšifruotuose duomenyse nėra vartotojo duomenų');
    }
    const { email, token } = req.tokenData;
    const userDoc = await UserModel.findOne({ email });

    if (userDoc === null) {
      throw new Error(`Cant't find a user with the email'${email}'`);
    }
    const user = createUserViewModel(userDoc);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Server error trying to identify the user',
    });
  }
};
