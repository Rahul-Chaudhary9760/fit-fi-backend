import { Request, Response } from "express";
import { loginAdmin } from "./auth.service.js";
import { sendSuccess } from "../../utils/Response.js";
import { sendError } from "../../utils/ApiError.js";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    const result = await loginAdmin({ email, password });
    const token = result.token;
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return sendSuccess(res, result.admin, "Login successful", {}, 200);
  } catch (error: any) {
    return sendError(res, error.message || "Login failed", 401);
  }
}
