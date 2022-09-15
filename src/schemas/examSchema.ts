import joi from "joi"

const examSchema = joi.object({
    name: joi.string().min(3).required(),
    url: joi.string().uri().required(),
    category: joi.string().required(),
    discipline: joi.string().required(),
    teacher: joi.string().required()
})

export default examSchema;