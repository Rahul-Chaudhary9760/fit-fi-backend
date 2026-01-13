import mongoose, { Document, Schema } from "mongoose";

export interface Imember extends Document {
  name: string;
  phoneNumber: string;
  plan?: string;
  startDate?: string;
  endDate?: string;
  feesAmount?: number;
}

const memberSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      lowercase: true,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: { type: Date },
    feesAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Member = mongoose.model<Imember>("Member", memberSchema);
