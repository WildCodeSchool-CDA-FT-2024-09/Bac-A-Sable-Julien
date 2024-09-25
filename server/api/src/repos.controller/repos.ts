import express, { Response} from "express";
import repos from "../../data/repos.json"


const repoControllers = express.Router();

repoControllers.get("/repos", (_: any, res: Response)=>{
  res.status(200).json(repos);  
})


export default repoControllers