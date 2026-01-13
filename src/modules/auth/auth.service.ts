import bcrypt from "bcryptjs";
import { Admin } from "./auth.model.js";
import { signToken } from "../../utils/jwt.js";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginAdmin(input: LoginInput) {
  const admin = await Admin.findOne({ email: input.email });
  if (!admin) {
    throw new Error("Admin not found");
  }
  const isMatch = await bcrypt.compare(input.password, admin.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: admin.id, email: admin.email, role: "Admin" });

  return {
    admin: {
      id: admin.id,
      email: admin.email,
    },
    token: token,
  };
}
