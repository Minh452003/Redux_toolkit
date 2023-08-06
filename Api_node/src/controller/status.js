import Status from "../model/status.js";

// API để lấy danh sách trạng thái
export const getStatusList = async (req, res) => {
  try {
    const statusList = await Status.find();
    res.status(200).json(statusList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createStatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStatus = await Status.create({ name, description });

    res.status(201).json({
      message: 'Trạng thái đã được tạo thành công',
      data: newStatus,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Không thể tạo trạng thái',
      error: error.message,
    });
  }
};