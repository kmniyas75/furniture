import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res, next) => {
  try {
    const email = await req.body.email;
    const password = await req.body.password;
    if (email !== process.env.EMAIL_ID)
      return next(createError(404, 'User not found!'));

    if (password !== process.env.PASSWORD)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      { email: email, password: password },
      process.env.JWT
    );

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ isAdmin: true });
  } catch (err) {
    next(err);
  }
};
