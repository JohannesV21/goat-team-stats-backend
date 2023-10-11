import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";
import jwt from "jsonwebtoken";

/**
 * Middleware to validate the token in each request
 */
export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"];

  jwt.verify(token, process.env.SEED || "", (error: any, _decoded: any) => {
    if (error)
      return res.status(401).json(
        new ErrorResponse({
          message: "Invalid token",
          statusCode: 401,
          error,
        })
      );

    // req.body.user = decoded.user;

    next();
  });
};
