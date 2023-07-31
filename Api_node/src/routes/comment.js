import express from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { create, getAll, getCommentFromProduct, getOneComment, removeComment, updateComment } from "../controller/comment.js";

const routerComment = express.Router();

routerComment.get("/comment/:productId", getCommentFromProduct)
routerComment.get("/comment/:id/detail", getOneComment)
routerComment.post("/comment", create)
routerComment.put("/comment/:id", updateComment, checkPermission)
routerComment.delete("/comment/:id", removeComment)
routerComment.get("/comment", getAll)

export default routerComment;