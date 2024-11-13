"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = exports.LanguageInput = void 0;
const typeorm_1 = require("typeorm");
const repo_1 = require("./repo");
const type_graphql_1 = require("type-graphql");
let LanguageInput = class LanguageInput {
};
exports.LanguageInput = LanguageInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LanguageInput.prototype, "label", void 0);
exports.LanguageInput = LanguageInput = __decorate([
    (0, type_graphql_1.InputType)()
], LanguageInput);
let Language = class Language extends typeorm_1.BaseEntity {
};
exports.Language = Language;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Language.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Language.prototype, "label", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [repo_1.Repo], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => repo_1.Repo, repo => repo.languages),
    __metadata("design:type", Array)
], Language.prototype, "repos", void 0);
exports.Language = Language = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, type_graphql_1.InputType)(),
    (0, typeorm_1.Entity)()
], Language);
//# sourceMappingURL=language.js.map