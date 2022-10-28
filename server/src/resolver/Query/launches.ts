import { paginateResults } from '../../utils';
import { Context, Record } from '../../common/interfaces';

export const launches = async (_ : any, {pageSize = 20, after}, context : Context) => {
    const allLaunches = await context.dataSources.launchAPI.getAllLaunches();
    allLaunches.reverse();
    const launches = paginateResults({
      after,
      pageSize,
      results: allLaunches
    });
    const result = {
      launches,
      cursor: launches.length ? launches[launches.length - 1].cursor : null,
      hasMore: launches.length
        ? launches[launches.length - 1].cursor !==
          allLaunches[allLaunches.length - 1].cursor
        : false
    };
    return result;
};