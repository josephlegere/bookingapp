const Joi = require('joi')

//  REGISTER VALIDATION
exports.registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        contact: Joi.string()
            .required(),
        type: Joi.string()
            .required(),
        role: Joi.string()
            .required(),
        seller_group: Joi.object()
    });

    return schema.validate(data);
}

//  LOGIN VALIDATION
exports.loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        deviceEntry: Joi.string()
    });

    return schema.validate(data);
}