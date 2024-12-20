import express from "express";
import db from "./db.js";
import { router } from "./router/router.js";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use("/api", router);
db();
app.listen(process.env.PORT, async () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
