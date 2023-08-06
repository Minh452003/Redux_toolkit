import Bill from '../model/bill.js';

export const createBill = async (req, res) => {
    try {
        const billData = req.body; // Get bill data from the request
        // You might want to validate the billData before creating
        const newBill = await Bill.create(billData);

        return res.status(201).json({
            message: 'Đặt hàng thành công',
            data: newBill,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const getBillsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bills = await Bill.find({ userId }).populate('products.productId status');
        return res.status(200).json(bills);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const removeBill = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Bill.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Xoá đơn hàng thành công",
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
};
export const getBillById = async (req, res) => {
    const billId = req.params.billId;

    try {
        const bill = await Bill.findById(billId).populate('products.productId status');
        if (!bill) {
            return res.status(404).json({
                message: 'Đơn hàng không tồn tại'
            });
        }
        return res.status(200).json(bill);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};