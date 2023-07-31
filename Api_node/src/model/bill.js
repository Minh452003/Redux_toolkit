import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: String,
        price: Number,
        image: String,
        quantity: Number,
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      }
    ],
    name: {
      type: String,
      required: true
    },
    total: {
      type: Number,
    },
    status: {
      type: mongoose.Types.ObjectId,
      ref: "Status",
      default: "6488a17e098b67f90d85df71"
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    notes: {
      type: String,
    },
       quantity: {
        type: Number,
  
    },
    orderCancellation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderCancellation",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Bill", cartSchema);
