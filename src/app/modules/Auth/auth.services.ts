import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }
  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "acbdfdjfd449898532dfdfdfjdjf458989fdsfjdskfjd!@#@%$#*#JDFKJDUII",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "3487583hdsjfdf@#$U#$(#@(@#58989fdsfjdskfjd!@#@%$#*#JDFKJDUII",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};
export const AuthServices = {
  loginUser,
};
