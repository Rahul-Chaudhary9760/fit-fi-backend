import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

import authRoutes from "./modules/auth/auth.routes.js";
import membersRoutes from "./modules/members/members.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/members", authMiddleware, membersRoutes);

export default app;
