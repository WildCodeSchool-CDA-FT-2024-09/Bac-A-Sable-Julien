"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repos_controller_1 = __importDefault(require("../repos.controller/repos.controller"));
const lang_controller_1 = __importDefault(require("../lang.controller/lang.controller"));
const status_controller_1 = __importDefault(require("../status.controller/status.controller"));
const app = express_1.default.Router();
app.use("/repos", repos_controller_1.default);
app.use("/langs", lang_controller_1.default);
app.use("/status", status_controller_1.default);
exports.default = app;
//# sourceMappingURL=router.js.map