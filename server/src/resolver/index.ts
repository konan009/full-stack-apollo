import { Query } from './Query';
import { Mutation } from './Mutation';
import { ObjectTypes } from './Types';

export const resolvers = {
  Query,
  Mutation,
  ...ObjectTypes,
};
