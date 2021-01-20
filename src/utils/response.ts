import _ from 'lodash';
const logger = require('../config/winston').logger;
/**
 * To build a global success response for all the apis
 *
 * @param { object } data
 * @param { string } message
 * @param { number } statusCode
 * @param {number} total
 */
export const successResponse = (
  data,
  message,
  statusCode = 200,
  total = 0,
) => {
  logger.info(statusCode);
  return {
    error: false,
    message: message,
    total,
    data,
  };
};
/**
 * To build a global error response parser.
 *
 * @param { object } error
 */
export const errorResponse = (error :any) => {
  let messageObject = error.message;
  var messages = {};
  if (_.isArray(messageObject)) {
    for (const el of messageObject) {
      let msg = el.message.replace(/[^a-zA-Z0-9_ ]/g, '');
      let message =
        msg.charAt(0).toUpperCase() + msg.slice(1).replace(/_/g, ' ');
      let key = _.isArray(el.path) ? el.path[0] : el.path;
      messages[key] = message;
    }
  }
  if (_.isObject(messageObject)) {
    for (const el in messageObject) {
      logger.info(`${el}:${messageObject}`);
      let key = messageObject.name;
      let message = messageObject.message;
      messages[key] = message;
    }
  }
  const msgArrayObject = !_.isEmpty(messages) ? messages : undefined;
  var errorMessage =
    typeof error.message === 'string' || error.message instanceof String
      ? error.message.trim()
      : error.message;

  return {
    error: true,
    message: msgArrayObject || errorMessage || 'Something went wrong!',
  };
};

/**
 * To handle 422 success response
 * @param res 
 * @param error 
 * @param optionalMsg 
 */
export const status422 =(res:any,error:any,optionalMsg?:any)=>{
  let message = optionalMsg? optionalMsg : error.details || error.errors || error.message
  return res.status(422).send(
    errorResponse({
      statusCode: 422,
      message,
    }),
  );
}
/**
 * To handle 200 success response
 * @param res 
 * @param model 
 * @param message 
 * @param totalCount 
 */
export const status200 =(res:any,model:any,message:string,totalCount?:any)=>{
  return res
  .status(200).send(successResponse(model, message, 200,totalCount));
}

/**
 * To handle 201 success response
 * @param res 
 * @param model 
 * @param message 
 */
export const status201 =(res:any,model:any,message:string)=>{
  return res
  .status(201).send(successResponse(model, message, 201));
}

/**
 * To handle 400 success response
 * @param res 
 * @param error 
 */
export const status400 =(res:any,error:any)=>{
  return res.status(400).send(
    errorResponse({
      statusCode: 400,
      message: error.details || error.errors || error.message,
    }),
  );
}