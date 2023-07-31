import Joi from "joi";

export const billSchema = Joi.object({
  name: Joi.string().required(),
  userId: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống khach hang",
    "any.required": "Trường 'khach hang' là bắt buộc",
  }),
  products: Joi.array().required(),
  // quantity: Joi.number().required().min(0),
  total: Joi.number().required().min(0),
  phone: Joi.string().required().min(0),
  status: Joi.string().min(0),
  city: Joi.string(),
  notes: Joi.string(),
  address: Joi.string().messages({
    "string.empty": "Không được bỏ trống dia chi",
    "any.required": "Trường 'dia chi' là bắt buộc",
  }),

});