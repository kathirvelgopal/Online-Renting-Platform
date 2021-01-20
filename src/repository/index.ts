import {status422} from '../utils/response';

/**
 * To check the id is existing on table
 * @param model 
 * @param id 
 * @param res 
 * @param custom 
 */
export const isExistId = async (model :any,id:String,res:any,custom:String): Promise<void> => {
  // To find by id in table
  const isIdExists =await model.findOne({
  _id: id
});
// Id is not exists and throw error
if (!isIdExists) {
  status422(res,'',`${custom} not exists.`);
}
  
}