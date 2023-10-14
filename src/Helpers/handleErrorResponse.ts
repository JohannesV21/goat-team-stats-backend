import { Response } from "express";
import { ErrorResponse } from "../Shared/Contexts/ErrorResponse";

interface ICustomError {
  error: any;
  res: Response;
}

/**
 * Function for error handling in controllers.
 *
 * @function
 * @param {ICustomError} - An object containing the error and response properties.
 */

export const handleErrorResponse = ({ error, res }: ICustomError) => {
  if (error instanceof ErrorResponse) {
    res.status(error.statusCode).json(error);
  } else {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
