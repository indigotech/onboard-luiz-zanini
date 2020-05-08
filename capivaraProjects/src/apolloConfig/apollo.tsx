import ApolloClient, { InMemoryCache } from 'apollo-boost';


export const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache()
});
