import { Response } from "express";

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400
) => {
  return res.status(statusCode).json({
    status: false,
    message,
  });
};
