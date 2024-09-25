import express from "express";
import repos from "../../data/repos.json"
import { Response } from "express";

const repoController = express.Router();

repoController.get("/", (req: Request, res: Response)=>{
  res.status(200).json(repos);  
})