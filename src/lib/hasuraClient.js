import { GraphQLClient } from 'graphql-request';

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

if (!HASURA_ENDPOINT || !HASURA_ADMIN_SECRET) {
  throw new Error('Missing required environment variables');
}

export const hasuraClient = new GraphQLClient(HASURA_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
  },
});

