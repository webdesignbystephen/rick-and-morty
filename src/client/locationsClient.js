import { ApolloClient, InMemoryCache } from '@apollo/client';

const locationsClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
})

export default locationsClient;
