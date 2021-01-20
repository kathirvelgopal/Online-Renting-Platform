const Joi = require('@hapi/joi');
/**
* To validate the user while create
*/
export const createUserValidationRules = Joi.object({
 // firstName validate the accept alphabet characters only
 firstName: Joi.string().required().ruleset.pattern(
  new RegExp('^[A-Za-z ]+$'),
).rule({
  message:
    'First Name  must not contain numbers and special characters',
}),
//lastName validate the accept alphabet characters only
lastName: Joi.string().required().ruleset.pattern(
  new RegExp('^[A-Za-z ]+$'),
)
.rule({
  message:
    'Last Name  must not contain numbers and special characters',
}),
 // email
 email: Joi.string()
   .email()
   .required(),
}).unknown(true);

/**
* To validate the rent items while create
*/
export const createItemValidationRules = Joi.object({
  // name validate the accept alphabet characters only
  name: Joi.string().required().ruleset.pattern(
    new RegExp('^[A-Za-z ]+$'),
  )
  .rule({
    message:
      'Name  must not contain numbers and special characters',
  }),
  // rentPrice
  rentPrice: Joi.number().required(),
  // manufactureDate
  manufactureDate: Joi.string()
    .required(),
// actualCostPrice
  actualCostPrice: Joi.number()
  .required()
 }).unknown(true);