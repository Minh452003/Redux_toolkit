import mongoose from 'mongoose';

const statusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
});

export default mongoose.model('Status', statusSchema);