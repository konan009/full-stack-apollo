// const {ApolloServer } = require('apollo-server');
// const typeDefs = require('./schema');
// const {createStore} = require('./utils');
// const resolvers = require('./resolvers');
// require('dotenv').config();

// const LaunchAPI = require('./datasources/launch');
// const UserAPI = require('./datasources/user');
// const isEmail = require('isemail');
// const store = createStore();

// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
// const { defaultFieldResolver } = require('graphql');

// function upperDirectiveTransformer(schema, directiveName) {
//   return mapSchema(schema, {
//     // Runs for each schema
//     [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
//       // Check for each field
//       const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
//       if (upperDirective) {
//         const { resolve = defaultFieldResolver } = fieldConfig;
//         // Replace the original resolver with a function that *first* calls
//         // the original resolver, then converts its result to upper case
//         fieldConfig.resolve = async function (source, args, context, info) {
//           const result = await resolve(source, args, context, info);
//           if (typeof result === 'string') {
//             return result.toUpperCase();
//           }
//           return result;
//         }
//         return fieldConfig;
//       }
//     }
//   });
// }

// // Create the base executable schema
// let schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });
// schema = upperDirectiveTransformer(schema, 'upper');

// const server = new ApolloServer({
//     context: async ({req}) => {
//         // simple auth check on every request
//         const auth = (req.headers && req.headers.authorization) || '';
//         const email = Buffer.from(auth, 'base64').toString('ascii');
//         if (!isEmail.validate(email)) return {user: null};
//         // find a user by their email
//         const users = await store.users.findOrCreate({where: {email}});
//         const user = (users && users[0]) || null;

//         return {user: {...user.dataValues}};
//       },
//     schema,
//     dataSources: () => ({
//       launchAPI: new LaunchAPI(),
//       userAPI: new UserAPI({store})
//     }),

// });

// server.listen().then(() => {
//   console.log(`
//     Server is running!
//     Listening on port 4000
//     Explore at https://studio.apollographql.com/sandbox
//   `);
// });

import { resolvers } from './resolver';
import { typeDefs } from './schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server';
import { LaunchDataSource, UserDataSource } from './datasources';

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const { createStore } = require('./utils');
const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    return null;
  },
  schema,
  dataSources: () => ({
    launchAPI: new LaunchDataSource(),
    userAPI: new UserDataSource({ store }),
  }),
});
