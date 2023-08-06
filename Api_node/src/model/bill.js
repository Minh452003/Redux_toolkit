import mongoose from 'mongoose';

const billSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: mongoose.Types.ObjectId,
      ref: 'Status',
      default: '64cf5fa3ab6cc8580178e225'
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notes: String,
    // other fields as needed
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Bill', billSchema);
