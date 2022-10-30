import { Context, QueryLaunchArgs, QueryLaunchReturn } from '../../common/interfaces';

export const launch = (
  _: any,
  { id }: QueryLaunchArgs,
  context: Context
): Promise<QueryLaunchReturn> => {
  return context.dataSources.launchAPI.getLaunchById(id);
};
