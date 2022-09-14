
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    throw {
      type: "unauthorized",
      message: "No token",
    };
  }

  const user = jwt.verify(token, secretKey);
  if (!user) {
    throw {
      type: "not_found",
      message: "User not found",
    };
  }

  res.locals.user = Number(user);
  console.log(res.locals.user)
  next();
}