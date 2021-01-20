import { IItem } from "../types/item";
import { model, Schema } from "mongoose"
const itemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rentPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    manufactureDate: {
      type: Date,
      required: true,
      trim: true,
    },
    actualCostPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
  
)

export default model<IItem>("Items", itemSchema)