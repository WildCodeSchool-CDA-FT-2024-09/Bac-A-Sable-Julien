"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repo_1 = require("../entities/repo");
const status_1 = require("../entities/status");
const language_1 = require("../entities/language");
const typeorm_1 = require("typeorm");
const repoControllers = express_1.default.Router();
repoControllers.get("/", async (_req, res) => {
    try {
        const repos = await repo_1.Repo.find({
            relations: {
                status: true,
                languages: true
            }
        });
        res.status(200).json(repos);
    }
    catch (error) {
        res.sendStatus(500).json({ message: "Error fetching repos" });
    }
});
repoControllers.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const repo = await repo_1.Repo.findOneBy({ id });
    if (repo) {
        res.status(200).json(repo);
    }
    else {
        res.status(404).json({ message: 'Repo not found' });
    }
});
repoControllers.post('/', async (req, res) => {
    console.log('%c⧭', 'color: #00a3cc', " hello");
    try {
        const repo = new repo_1.Repo();
        repo.idGit = req.body.idGit;
        repo.name = req.body.name;
        repo.url = req.body.url;
        const status = await status_1.Status.findOneOrFail({ where: { id: req.body.isPrivate } });
        repo.status = status;
        const languageEntities = await language_1.Language.findBy({ id: (0, typeorm_1.In)(req.body.languages) });
        repo.languages = languageEntities;
        await repo.save();
        res.status(201).json({ message: "Repo created successfully", repo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating repo" });
    }
});
repoControllers.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const repo = await repo_1.Repo.findOneBy({ id });
    if (repo) {
        repo.idGit = req.body.idGit;
        repo.name = req.body.name;
        repo.url = req.body.url;
        const status = await status_1.Status.findOneOrFail({ where: { id: req.body.status } });
        repo.status = status;
        await repo.save();
        res.status(201).json({ message: 'Repo modify' });
    }
    else {
        throw new Error(`erreur de modification`);
    }
});
repoControllers.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const repo = await repo_1.Repo.findOneBy({ id });
    if (repo) {
        await repo.remove();
        res.status(204).json({ message: 'Repo delete' });
    }
    else {
        res.status(404).json({ message: 'Repo not found' });
    }
});
exports.default = repoControllers;
//# sourceMappingURL=repos.controller.js.map