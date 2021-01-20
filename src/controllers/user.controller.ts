import { Response, Request } from "express";
import { IUser } from "../types/user";
import User from "../models/user.model";
import {status422,status200,status201,status400} from '../utils/response';
import {createUserValidationRules} from '../utils/validations';
import {isExistId} from '../repository/index';
const logger = require('../config/winston').logger;

/**
 * To find all the user list
 * @param req 
 * @param res 
 */
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userList: IUser[] = await User.find()
    status200(res,userList, 'Data fetched successfully',userList.length);
  } catch (error) {
    logger.info(error);
    status422(res,error);
  }
}
/**
 * To create and update the user 
 * @param req 
 * @param res 
 */
const addOrUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    //   To check whether the object is empty
    if (Object.keys(req.body).length === 0) {
      status422(res,'','User field cannot be empty');
    }
    // validations for creating and updating users
    await createUserValidationRules.validateAsync(req.body, {
      abortEarly: false,
    });
    // to update the user
    if(req.params.id){
      // To check if the user is exists in user table
     await isExistId(User,req.params.id,res,'User');
     const {
       params: { id },
       body,
     } = req
     const updateTodo: IUser | null = await User.findByIdAndUpdate(
       { _id: id },
       body,{
         new: true,
       }
     )
     status200(res,updateTodo, 'User updated successfully');
    }else{
      // to create the user
      const body = req.body as Pick<IUser, "firstName" | "lastName" | "email" | "mobileNumber" >
      const user: IUser = new User({...body})
    // save the user fields 
     const newTodo: IUser = await user.save();
     status201(res,newTodo,'User created successfully');
    }
  } catch (error) {
    logger.info(error);
    status422(res,error);
  }
}

/**
 * To delete the user 
 * @param req 
 * @param res 
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // To check if the user is exists in user table
    await isExistId(User,req.params.id,res,'User');
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    )
    status200(res,deletedUser, 'User deleted successfully');
  } catch (error) {
    logger.info(error);
    status400(res,error);
  }
}
//export the function name 
export { getUser, addOrUpdateUser,deleteUser}