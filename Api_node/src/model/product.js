import mongoose, { Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: Number,
    image: Object,
    description: String,
    reQuantity: Number,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }
}, { timestamps: true, versionKey: false });
productsSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productsSchema);