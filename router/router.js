import { Router } from "express";
import { register, login ,getuser} from "../controller/auth.js";
import {createProperty,getproperty} from "../controller/property.js";
import {forgetPassword,resetPassword} from "../controller/resetpassword.js"
// import {maintenance,upload} from "../controller/maintenance.js"
const router = Router();

router.get("/user", getuser);
router.post("/signup", register);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);

router.post("/resetpassword", resetPassword);
// router.post("/maintenance",upload.single('image'), maintenance);
router.post("/createproperty",createProperty);
router.get("/getproperty", getproperty);
export { router };
