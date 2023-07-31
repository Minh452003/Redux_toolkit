import Joi from "joi";

export const statusSchema = Joi.object({
    _id: Joi.string(),
    status: Joi.string().required().messages({
        "string.empty": "Trạng thái không được để trống",
        "any.required": "Trạng thái là bắt buộc",
    }),
})