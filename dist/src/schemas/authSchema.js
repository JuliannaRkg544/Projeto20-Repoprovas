import joi from "joi";
var authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    passwordConfirmation: joi.valid(joi.ref("password")).required()
});
export default authSchema;
