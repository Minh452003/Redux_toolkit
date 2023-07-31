import express from "express";
import { signUp, signIn, getAll, get, remove, update } from "../controller/auth.js";

const routerUser = express.Router();

routerUser.post("/signup", signUp);
routerUser.post("/signin", signIn);
routerUser.get("/user", getAll);
routerUser.get("/user/:id", get);
routerUser.delete("/user/:id", remove);
routerUser.patch("/user/:id", update)

export default routerUser