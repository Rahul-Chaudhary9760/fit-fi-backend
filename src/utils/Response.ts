import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  meta?: { page?: number; limit?: number; total?: number },
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
    meta: meta || undefined,
    statusCode,
  });
};
