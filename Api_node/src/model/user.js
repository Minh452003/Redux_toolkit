import mongoose from "mongoose";
import { format } from "date-fns";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: "member"
    },
    image: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.virtual("formattedCreatedAt").get(function () {
    return format(this.createdAt, "HH:mm a dd/MM/yyyy");
});
export default mongoose.model("User", userSchema);