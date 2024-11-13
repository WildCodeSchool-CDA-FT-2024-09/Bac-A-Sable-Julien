"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRepo = void 0;
const joi_1 = __importDefault(require("joi"));
const shema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    url: joi_1.default.string().required(),
    isPrivate: joi_1.default.number().min(1).max(2).required()
});
const validateRepo = (req, res, next) => {
    console.log("type de isPrivate ", typeof req.body.isPrivate);
    const { error } = shema.validate(req.body);
    if (error == null) {
        next();
    }
    else {
        res.status(422).json(error);
    }
};
exports.validateRepo = validateRepo;
//# sourceMappingURL=service.js.map