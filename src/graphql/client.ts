import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || 'http://localhost:1337/graphql',
});

export const GraphqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
