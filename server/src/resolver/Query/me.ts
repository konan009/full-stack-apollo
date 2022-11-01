import { Context } from '../../common/interfaces';
import { QueryMeReturn, QueryMeParent, QueryMeArgs } from '../../common/interfaces';

export const me = (_: QueryMeParent, __: QueryMeArgs, context: Context): Promise<QueryMeReturn> => {
  return context.dataSources.userAPI.findOrCreateUser({});
};
