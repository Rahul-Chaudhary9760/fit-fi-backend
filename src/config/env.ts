import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

if (!env.MONGO_URI || !env.JWT_SECRET) {
  throw new Error("Missing environment variables");
}
