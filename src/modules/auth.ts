import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.name
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    return res.json({
      message: 'Not authorized!'
    });
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    return res.json({
      message: 'Not authorized!'
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    res.status(401);
    return res.json({
      message: 'Not valid token!'
    });
  }
};
