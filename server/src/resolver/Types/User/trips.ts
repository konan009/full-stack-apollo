import { Context, UserTripsParent, UserTripsArgs } from '../../../common/interfaces';

export const trips = async (user: UserTripsParent, __: UserTripsArgs, context: Context) => {
  // get ids of launches by user
  const launchIds = await context.dataSources.userAPI.getLaunchIdsByUser();

  if (!launchIds.length) return [];

  // look up those launches by their ids
  return context.dataSources.launchAPI.getLaunchesByIds(launchIds) || [];
};
