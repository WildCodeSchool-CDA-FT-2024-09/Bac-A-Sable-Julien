import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { dataSource } from "./data-source";
import RepoResolver from "./resolver/repo.resolver";
import LanguageResolver from "./resolver/lang.resolver";


const port = parseInt(process.env.PORT || "4000", 10);
console.log('%c⧭', 'color: #00e600', port);

dotenv.config();


(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, LanguageResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
