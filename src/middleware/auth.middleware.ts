import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
interface jwtPayload {
  id: string;
  email: string;
  role: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return sendError(res, "Unauthorized", 401);
    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwtPayload;
    (req as any).user = decodeToken;
    return next();
  } catch (error: any) {
    return sendError(res, error?.message || "Unauthorized request", 500);
  }
};

export default authMiddleware;
