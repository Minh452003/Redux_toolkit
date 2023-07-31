import Status from '../model/status.js';

// Get all statuses
export const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findById(id);
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};