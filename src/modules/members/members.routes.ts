import { Router } from "express";
import {
  addMember,
  getAllMembers,
  updateMemberData,
} from "./members.controller.js";

const router = Router();

router.post("/addmember", addMember);
router.get("/allmembers", getAllMembers);
router.patch("/updatemember/:id", updateMemberData);

export default router;
