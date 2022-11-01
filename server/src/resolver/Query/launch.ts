import {
  Context,
  QueryLaunchArgs,
  QueryLaunchReturn,
  QueryLaunchParent,
} from '../../common/interfaces';

export const launch = (
  _: QueryLaunchParent,
  { id }: QueryLaunchArgs,
  context: Context
): Promise<QueryLaunchReturn> => {
  return context.dataSources.launchAPI.getLaunchById(id);
};
