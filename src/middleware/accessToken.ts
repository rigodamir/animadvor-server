import jwt from "jsonwebtoken";
import "dotenv/config";

export const accessToken = (userData: any) => {
  return jwt.sign(
    { name: userData.name, isAdmin: userData.isAdmin },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1min",
    }
  );
};

export const refreshToken = (userData: any) => {
  return jwt.sign(userData, process.env.REFRESH_TOKEN);
};

export const verifyRefreshToken = (token: string) => {
  const userData = jwt.verify(token, process.env.REFRESH_TOKEN);
  const newToken = accessToken(userData);
  return newToken;
};
