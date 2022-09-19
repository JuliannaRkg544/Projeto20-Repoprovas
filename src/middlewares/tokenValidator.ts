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

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err){ 
     return res.sendStatus(404)
    }
    res.locals.user = decoded;
    console.log(decoded)
  });

  next();
}
