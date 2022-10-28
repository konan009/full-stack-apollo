import { Context, Record } from '../../../common/interfaces';

export const trips = async (_ : Record<string,unknown>, __ : any, context: Context) => {
    // get ids of launches by user
    const launchIds = await context.dataSources.userAPI.getLaunchIdsByUser();

    if (!launchIds.length) return [];

    // look up those launches by their ids
    return (
      context.dataSources.launchAPI.getLaunchesByIds(launchIds) || []
    );
};