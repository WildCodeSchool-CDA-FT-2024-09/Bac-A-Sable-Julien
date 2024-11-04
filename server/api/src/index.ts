import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { dataSource } from "./data-source";
import RepoResolver from "./resolver/repo.resolver";
import LanguageResolver from "./resolver/lang.resolver";

dotenv.config();
const { PORT } = process.env;

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LanguageResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { host: '0.0.0.0', port: Number(PORT) }
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
