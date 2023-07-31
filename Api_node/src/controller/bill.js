import Bill from '../model/bill.js';
import { billSchema } from '../schemas/bill.js';

export const getAll = async (req, res) => {
    try {
        const data = await Bill.find().populate("products.userId status");
        if (data.length === 0) {
            return res.status(203).json({
                message: "Không có đơn hàng nào",
            });
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Bill.findById(id).populate("products.userId status");
        if (!data) {
            return res.status(200).json({
                message: "Không có đơn hàng"
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = billSchema.validate(body, { abortEarly: false });
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const data = await Bill.create(body);
        if (!data) {
            return res.status(200).json({
                message: "Thêm đơn hàng thất bại"
            });
        }
        return res.status(200).json({
            message: "Thêm đơn hàng thành công",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await Bill.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!data) {
            return res.status(200).json({
                message: "Cập nhật thất bại"
            });
        }
        return res.status(200).json({
            message: "Cập nhật thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const getByIdUser = async (req, res) => {
    try {
        const idUser = req.params.userId;
        const orders = await Bill.find({ userId: idUser }).populate("products.userId status ");
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
