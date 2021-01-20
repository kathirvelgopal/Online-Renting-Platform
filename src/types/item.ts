import { Document } from "mongoose"

export interface IItem extends Document {
  name: string
  rentPrice: number
  manufactureDate: string,
  actualCostPrice :number

}