import { Document } from "mongoose"

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string,
  mobileNumber :number,
  password: string,
  profileImage:string
}