import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { dataSource } from "./data-source";
import RepoResolver from "./resolver/repo.resolver";
import LanguageResolver from "./resolver/lang.resolver";


const port = parseInt(process.env.PORT || "4000", 10);
console.log('%c⧭', 'color: #00e600', port);



(async () => {
  try {
    await dataSource.initialize();
    console.log("Data source initialized successfully");

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
  } catch (error) {
    console.error("Error during server initialization: ", error);
  }
})();

