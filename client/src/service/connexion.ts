import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({

  uri: "https://bac-a-sable-julien-1.onrender.com",
  cache: new InMemoryCache()
}
)

export default client