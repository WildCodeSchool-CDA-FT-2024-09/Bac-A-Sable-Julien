import express from "express";
import { Response } from "express";
import repos from "../../data/repos.json"

const router = express.Router();

// router.get("/", (_, res: Response)=>{
//   res.send("Hello Pascal");
// })

router.use("/", (_, res: Response)=>{
  res.status(200).json(repos);
})

export default router