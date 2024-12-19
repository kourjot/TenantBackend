import { Router } from "express";

import { register, login ,getuser} from "../controller/auth.js";
const router = Router();

router.get("/user", getuser);
router.post("/register", register);
router.post("/login", login);

export { router };
