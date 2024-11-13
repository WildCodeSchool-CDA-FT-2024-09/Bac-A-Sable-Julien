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
exports.LightRepo = exports.Repo = void 0;
const typeorm_1 = require("typeorm");
const status_1 = require("./status");
const language_1 = require("./language");
const type_graphql_1 = require("type-graphql");
let Repo = class Repo extends typeorm_1.BaseEntity {
};
exports.Repo = Repo;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Repo.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Repo.prototype, "idGit", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Repo.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => status_1.Status),
    (0, typeorm_1.ManyToOne)(() => status_1.Status, status => status.id),
    __metadata("design:type", status_1.Status)
], Repo.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Repo.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [language_1.Language], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => language_1.Language, language => language.repos, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Repo.prototype, "languages", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Repo.prototype, "isFavorite", void 0);
exports.Repo = Repo = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Repo);
let LightRepo = class LightRepo extends typeorm_1.BaseEntity {
};
exports.LightRepo = LightRepo;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], LightRepo.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LightRepo.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LightRepo.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], LightRepo.prototype, "isFavorite", void 0);
exports.LightRepo = LightRepo = __decorate([
    (0, type_graphql_1.ObjectType)()
], LightRepo);
//# sourceMappingURL=repo.js.map