"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const class_validator_1 = require("class-validator");
const status_1 = require("../entities/status");
const data_source_1 = require("../data-source");
const statusController = express_1.default.Router();
statusController.get("/", async (_, res) => {
    try {
        const status = await status_1.Status.find({
            relations: {
                repos: true
            }
        });
        res.status(200).json(status);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
statusController.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const status = await status_1.Status.findOneBy({ id });
    if (status) {
        res.status(200).json(status);
    }
    else {
        res.status(404).json({ message: 'status not found' });
    }
});
statusController.post('/', async (req, _res) => {
    const status = new status_1.Status();
    status.label = req.body.label;
    const errors = await (0, class_validator_1.validate)(status);
    if (errors.length > 0) {
        throw new Error(`Validation failed!`);
    }
    else {
        await data_source_1.dataSource.manager.save(status);
    }
});
statusController.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const status = await status_1.Status.findOneBy({ id });
    if (status) {
        status.label = req.body.label;
        const errors = await (0, class_validator_1.validate)(status);
        if (errors.length > 0) {
            console.log('%c⧭', 'color: #00e600', errors);
            throw new Error(`Validation failed!`);
        }
        else {
            await status.save();
            res.status(201).json({ message: 'Status modify' });
        }
    }
    else {
    }
});
statusController.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const status = await status_1.Status.findOneBy({ id });
    if (status) {
        await status.remove();
        res.status(204).json({ message: 'Status delete' });
    }
    else {
        res.status(404).json({ message: 'Status not found' });
    }
});
exports.default = statusController;
//# sourceMappingURL=status.controller.js.map