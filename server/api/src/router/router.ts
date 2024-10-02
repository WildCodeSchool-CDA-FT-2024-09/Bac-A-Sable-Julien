import express from "express";
import repoControllers from "../repos.controller/repos.controller";
import langController from "../lang.controller/lang.controller";
import statusController from "../status.controller/status.controller";

const app = express.Router();

app.use("/repos", repoControllers)
app.use("/langs", langController)
app.use("/status", statusController)

export default app