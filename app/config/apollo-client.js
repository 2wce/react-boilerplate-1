import ApolloClient from 'apollo-boost';

const SERVER_URI = process.env.NODE_ENV === 'production'
  ? process.env.APOLLO_SERVER_PROD_URI
  : process.env.APOLLO_SERVER_DEV_URI;

const client = new ApolloClient({
  uri: SERVER_URI,
});

export default client;
