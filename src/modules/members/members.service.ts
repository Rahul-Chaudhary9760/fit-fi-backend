import { Imember, Member } from "./members.model.js";

interface RegisterMemberPayload {
  name: string;
  phoneNumber: string;
  plan: string;
  startDate: Date;
  endDate: Date;
  feesAmount: number;
}

const registerMember = async (
  payload: RegisterMemberPayload
): Promise<Imember> => {
  const member = await Member.create(payload);
  return member;
};

const fetchAllMembers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [members, total] = await Promise.all([
    Member.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Member.countDocuments(),
  ]);

  return {
    members,
    total,
    page,
    limit,
  };
};

const updateMemberDetails = async (memberId: string, payload: any) => {
  const member = await Member.findByIdAndUpdate(memberId, payload, {
    new: true,
  });
  if (!member) throw new Error("Member not found");
  return member;
};

export { registerMember, fetchAllMembers, updateMemberDetails };
