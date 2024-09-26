import express from "express";
import repoControllers from "../repos.controller/repos";
import langController from "../lang.controller/lang.controller";

const app = express.Router();

app.use("/repos", repoControllers)
app.use("/langs", langController)

export default app