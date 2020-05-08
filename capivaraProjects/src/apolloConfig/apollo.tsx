import ApolloClient, { InMemoryCache } from 'apollo-boost';


const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache()
});

export default client;
