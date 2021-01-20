import { IUser } from "../types/user";
import { model, Schema } from "mongoose"
const UserSchema: Schema = new Schema(
  {
    
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    countryCode: {
      type: String,
      required: false,
      default: '+91',
    },
    mobileNumber: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    profileImage: {
      type: String,
      required: false,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Items',
    },
  },
  { timestamps: true }
  
)

export default model<IUser>("Users", UserSchema)