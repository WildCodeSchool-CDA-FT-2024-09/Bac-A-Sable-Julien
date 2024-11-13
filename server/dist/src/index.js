"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const data_source_1 = require("./data-source");
const repo_resolver_1 = __importDefault(require("./resolver/repo.resolver"));
const lang_resolver_1 = __importDefault(require("./resolver/lang.resolver"));
const port = parseInt(process.env.PORT || "4000", 10);
console.log('%c⧭', 'color: #00e600', port);
(async () => {
    try {
        await data_source_1.dataSource.initialize();
        console.log("Data source initialized successfully");
        const schema = await (0, type_graphql_1.buildSchema)({
            resolvers: [repo_resolver_1.default, lang_resolver_1.default],
        });
        const server = new server_1.ApolloServer({
            schema,
        });
        const { url } = await (0, standalone_1.startStandaloneServer)(server, {
            listen: { port },
        });
        console.log(`🚀  Server ready at: ${url}`);
    }
    catch (error) {
        console.error("Error during server initialization: ", error);
    }
})();
//# sourceMappingURL=index.js.map