import { createSchema, createYoga } from 'graphql-yoga';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { resolvers } from '@graphql/resolvers';
import { typeDefs } from '@graphql/schema';


const { handleRequest } = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    }),

    graphqlEndpoint: '/api/graphql',

    fetchAPI: { Response }
});

export { handleRequest as POST };