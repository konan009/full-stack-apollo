import { MutationBookTripsArg, Context } from '../../common/interfaces';

export const bookTrips = async (
  _ : any, 
  { launchIds } : MutationBookTripsArg, 
  context : Context
  ) => {
    const results = await context.dataSources.userAPI.bookTrips(launchIds);
    const launches = await context.dataSources.launchAPI.getLaunchesByIds(launchIds);
    return {
      success: results && results.length === launchIds.length,
      message:
        results.length === launchIds.length
          ? 'trips booked successfully'
          : `the following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(String(id)),
            )}`,
      launches,
    };
  }



