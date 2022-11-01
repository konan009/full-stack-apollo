import { paginateResults } from '../../utils';
import {
  Context,
  QueryLaunchesArgs,
  QueryLaunchesReturn,
  QueryLaunchesParent,
} from '../../common/interfaces';

export const launches = async (
  _: QueryLaunchesParent,
  { pageSize = 20, after }: QueryLaunchesArgs,
  context: Context
): Promise<QueryLaunchesReturn> => {
  const allLaunches = await context.dataSources.launchAPI.getAllLaunches();
  allLaunches.reverse();
  const launches = paginateResults({
    after,
    pageSize,
    results: allLaunches,
  });

  const result = {
    launches,
    cursor: launches[launches.length - 1].cursor,
    hasMore: launches.length
      ? launches[launches.length - 1].cursor !== allLaunches[allLaunches.length - 1].cursor
      : false,
  };
  return result;
};
