"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const language_1 = require("../entities/language");
const repo_1 = require("../entities/repo");
const langController = express_1.default.Router();
langController.get("/", async (_, res) => {
    try {
        const lang = await language_1.Language.find({
            relations: {
                repos: true
            }
        });
        res.status(200).json(lang);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
langController.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const lang = await language_1.Language.findOneBy({ id });
    if (lang) {
        res.status(200).json(lang);
    }
    else {
        res.status(404).json({ message: 'lang not found' });
    }
});
langController.post('/', async (req, _res) => {
    const lang = new language_1.Language();
    lang.label = req.body.label;
    lang.save();
});
langController.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const lang = await language_1.Language.findOneBy({ id });
    if (lang) {
        lang.label = req.body.label;
        const repo = await repo_1.Repo.findOneOrFail({ where: { id: req.body.repo } });
        lang.repos = [...(lang.repos || []), repo];
        await lang.save();
        res.status(201).json({ message: 'lang modify' });
    }
    else {
        throw new Error(`erreur de modification`);
    }
});
langController.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const lang = await language_1.Language.findOneBy({ id });
    if (lang) {
        await lang.remove();
        res.status(204).json({ message: 'lang delete' });
    }
    else {
        res.status(404).json({ message: 'lang not found' });
    }
});
exports.default = langController;
//# sourceMappingURL=lang.controller.js.map