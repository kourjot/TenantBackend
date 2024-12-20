import { Router } from "express";
import { register, login ,getuser} from "../controller/auth.js";
import {createProperty,getproperty} from "../controller/property.js";
import {forgetPassword,resetPassword} from "../controller/resetpassword.js"
const router = Router();

router.get("/user", getuser);
router.post("/signup", register);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);

router.post("/resetpassword", resetPassword);
router.post("/createproperty",createProperty);
router.get("/getproperty", getproperty);
export { router };
