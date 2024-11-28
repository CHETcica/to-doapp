import { GraphQLClient } from 'graphql-request';

const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

// const HASURA_ENDPOINT = 'https://chet-todo.hasura.app/v1/graphql';
// const HASURA_ADMIN_SECRET = '1nXyy3HX9UBM4KKC1ixNOHA2Ih9IOV7DMo8W4q1QgSpGP5mhOdUwy137YuJ2Htej';

export const hasuraClient = new GraphQLClient(HASURA_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
  },
});
