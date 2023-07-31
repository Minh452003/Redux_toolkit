import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import router from "./routes/products.js";
import routerUser from "./routes/users.js";
import routerCategory from "./routes/categories.js";
import uploadRouter from "./routes/upload.js";
import routerBlog from "./routes/blogs.js";
import routerComment from "./routes/comment.js";
import routerCart from "./routes/cart.js";
import routerBill from "./routes/bill.js";
import routerStatus from "./routes/status.js";
// import routerCancelOrder from "./routes/cancelOrder";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use("/api", routerUser);
app.use("/api", routerCategory);
app.use("/api", uploadRouter);
app.use("/api", routerBlog);
app.use("/api", routerComment)
app.use("/api", routerCart)
app.use("/api", routerBill);
app.use("/api", routerStatus);


app.listen(8080, async () => {
    await mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Server is running 8080");
});


// app.use("/api", routerCancelOrder)
// mongoose.connect("mongodb://127.0.0.1:27017/Angular_WD17303");

// export const viteNodeApp = app;

