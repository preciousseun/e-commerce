const Joi = require('joi');

 function validateUser (user){
    const schema = Joi.object({
      firstName: Joi.string()
      .min(3)
      .max(20)
      .required(),
      lastName: Joi.string()
      .min(3)
      .max(20)
      .required(),
      username: Joi.string()
      .min(3)
      .max(20)
      .required(),
      address: Joi.string()
      .min(3)
      .required(),
      phoneNumber: Joi.string()
      .min(11)
      .required(),
      email: Joi.string()
      .min(3)
      .max(50)
      .required()
      .lowercase()
      .email(),
      password: Joi.string()
      .min(6)
      .required()
      .regex(/^[a-zA-Z0-9]{6,}$/)
    })
    return schema.validate(user);
}

module.exports = validateUser