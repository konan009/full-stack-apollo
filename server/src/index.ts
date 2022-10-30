import { resolvers } from './resolver';
import { typeDefs } from './schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';
import { LaunchDataSource, UserDataSource } from './datasources';
import { createStore } from './utils';
import isEmail from 'isemail';

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const store = createStore();
const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = (users && users[0]) || null;

    return { user: { ...user.dataValues } };
  },
  schema,
  dataSources: () => ({
    launchAPI: new LaunchDataSource(),
    userAPI: new UserDataSource({ store }),
  }),
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
