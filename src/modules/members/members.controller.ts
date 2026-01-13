import { Request, Response } from "express";
import { sendError } from "../../utils/ApiError.js";
import {
  registerMember,
  fetchAllMembers,
  updateMemberDetails,
} from "./members.service.js";
import { sendSuccess } from "../../utils/Response.js";

//Add Member
const addMember = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, plan, startDate, endDate, feesAmount } =
      req.body;
    if (!name || !phoneNumber)
      return sendError(res, "Name and Phone number are required", 400);
    const member = await registerMember({
      name,
      phoneNumber,
      plan,
      startDate,
      endDate,
      feesAmount,
    });
    return sendSuccess(res, member, "Member created Successfully", {}, 200);
  } catch (error: any) {
    return sendError(res, error?.message || "Unable to add member", 400);
  }
};

//Get all members
const getAllMembers = async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const result = await fetchAllMembers(page, limit);
    return sendSuccess(
      res,
      result.members,
      "Members fetched successfully",
      {
        page: result.page,
        limit: result.limit,
        total: result.total,
      },
      200
    );
  } catch (error: any) {
    return sendError(res, error?.message || "Unable to fetch members", 500);
  }
};

//Edit member details
const updateMemberData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) return sendError(res, "Member Id is required", 400);
    const updatedMember = await updateMemberDetails(id, data);
    if (!updatedMember) return sendError(res, "Member not found", 404);
    return sendSuccess(
      res,
      updatedMember,
      "Member details updated successfully",
      {},
      200
    );
  } catch (error: any) {
    return sendError(
      res,
      error?.message || "Unable to update member detail",
      500
    );
  }
};

export { addMember, getAllMembers, updateMemberData };
