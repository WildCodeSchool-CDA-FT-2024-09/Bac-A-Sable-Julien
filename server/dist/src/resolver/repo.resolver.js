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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const repo_1 = require("../entities/repo");
const status_1 = require("../entities/status");
let RepoInput = class RepoInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], RepoInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RepoInput.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RepoInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], RepoInput.prototype, "isPrivate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RepoInput.prototype, "idGit", void 0);
RepoInput = __decorate([
    (0, type_graphql_1.InputType)()
], RepoInput);
let RepoResolver = class RepoResolver {
    async GetAllRepo() {
        const repos = await repo_1.Repo.find({
            relations: {
                status: true,
                languages: true,
            },
        });
        console.info(repos);
        return repos;
    }
    async getAllReposFilter(filter) {
        if (filter) {
            return await repo_1.Repo.find({
                where: {
                    languages: {
                        label: String(filter),
                    },
                },
                relations: { languages: true, status: true },
            });
        }
        return await repo_1.Repo.find({
            relations: { languages: true, status: true },
        });
    }
    async lightrepos() {
        const repos = await repo_1.Repo.find();
        return repos;
    }
    async reposWithLanguages() {
        return await repo_1.Repo.find({ relations: ["languages"] });
    }
    async lightrepoById(id) {
        const repo = await repo_1.Repo.findOne({
            where: { id },
            select: ["id", "name", "url", "isFavorite"],
        });
        if (!repo) {
            throw new Error(`Repo with id ${id} not found`);
        }
        return repo;
    }
    async createNewRepo(newRepo) {
        const repo = new repo_1.Repo();
        repo.id = newRepo.id;
        repo.idGit = newRepo.idGit;
        repo.name = newRepo.name;
        repo.url = newRepo.url;
        const status = await status_1.Status.findOneOrFail({
            where: { id: +newRepo.isPrivate },
        });
        repo.status = status;
        await repo.save();
        const myRepo = await repo_1.Repo.findOneOrFail({
            where: { id: newRepo.id },
            relations: {
                languages: true,
                status: true,
            },
        });
        return myRepo;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [repo_1.Repo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RepoResolver.prototype, "GetAllRepo", null);
__decorate([
    (0, type_graphql_1.Query)(() => [repo_1.Repo]),
    __param(0, (0, type_graphql_1.Arg)("filter", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RepoResolver.prototype, "getAllReposFilter", null);
__decorate([
    (0, type_graphql_1.Query)(() => [repo_1.LightRepo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RepoResolver.prototype, "lightrepos", null);
__decorate([
    (0, type_graphql_1.Query)(() => [repo_1.Repo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RepoResolver.prototype, "reposWithLanguages", null);
__decorate([
    (0, type_graphql_1.Query)(() => repo_1.LightRepo, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RepoResolver.prototype, "lightrepoById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => repo_1.Repo),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RepoInput]),
    __metadata("design:returntype", Promise)
], RepoResolver.prototype, "createNewRepo", null);
RepoResolver = __decorate([
    (0, type_graphql_1.Resolver)(repo_1.Repo)
], RepoResolver);
exports.default = RepoResolver;
//# sourceMappingURL=repo.resolver.js.map