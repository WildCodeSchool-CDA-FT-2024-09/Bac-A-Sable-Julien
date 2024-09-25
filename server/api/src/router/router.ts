import express from "express";
import repoControllers from "../repos.controller/repos";

const app = express.Router();

app.use("/", repoControllers)

// router.use('/repos', repoControllers);

export default app