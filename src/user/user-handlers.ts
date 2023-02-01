import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    const token = createJWT(user);

    return res.json({ token });
  } catch (error) {
    console.error(error);

    return res.json({
      message: 'Something went wrong while creating your profile'
    });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    res.status(401);
    return res.json({
      message: 'Incorrect username or password.'
    });
  }

  const token = createJWT(user);

  return res.json({ token });
};
