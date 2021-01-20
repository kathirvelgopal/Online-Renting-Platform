import { Response, Request } from "express";
import { IItem } from "../types/item";
import Item from "../models/item.model";
import {status422,status200,status201,status400} from '../utils/response';
import {createItemValidationRules} from '../utils/validations';
import {isExistId} from '../repository/index';
const logger = require('../config/winston').logger;

/**
 * Get all the item list 
 * @param req 
 * @param res 
 */
const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    //find the item list 
    const itemList: IItem[] = await Item.find();
    status200(res,itemList, 'Data fetched successfully',itemList.length);
  } catch (error) {
    logger.info(error);
    status422(res,error);
  
  }
}
/**
 * To create  and update the rent item
 * @param req 
 * @param res 
 */
const addOrUpdateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    //   To check whether the object is empty
    if (Object.keys(req.body).length === 0) {
      status422(res,'','Item field cannot be empty');
    }
      // validations for creating  and updating Items
      await createItemValidationRules.validateAsync(req.body, {
        abortEarly: false,
      });
  // To update the user 
  if(req.params.id){
  // To check if the Item is exists in Item table
  await isExistId(Item,req.params.id,res,'Item');
  const {
    params: { id },
    body,
  } = req
  const updateItem: IItem | null = await Item.findByIdAndUpdate(
    { _id: id },
    body,{
      new: true,
    }
  )
  status200(res,updateItem, 'Item updated successfully');
  }else{
        const body = req.body as Pick<IItem, "name" | "rentPrice" | "manufactureDate" | "actualCostPrice">
        const item: IItem = new Item({
          name: body.name,
          rentPrice: body.rentPrice,
          manufactureDate: body.manufactureDate,
          actualCostPrice:body.actualCostPrice
        })
        // save the item fields
       const newItem: IItem = await item.save();
       status201(res,newItem,'Item created successfully');
      }
    
  } catch (error) {
    logger.info(error);
    status422(res,error);
    
  }
}

/**
 * To delete rent items
 * @param req 
 * @param res 
 */
const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
  // To check if the Item is exists in Item table
  await isExistId(Item,req.params.id,res,'Item')
    const deletedItem: IItem | null = await Item.findByIdAndRemove(
      req.params.id
    )
    status200(res,deletedItem, 'Item deleted successfully');
  } catch (error) {
    logger.info(error);
    status400(res,error);
  }
}
//export the function name 
export { getItem, addOrUpdateItem,deleteItem}