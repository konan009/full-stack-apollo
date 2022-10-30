import { MutationCancelTripArgs, Context } from '../../common/interfaces';
import { MutationCancelTripReturn } from '../../common/interfaces';

export const cancelTrip = async (
  _: any,
  { launchId }: MutationCancelTripArgs,
  context: Context
): Promise<MutationCancelTripReturn> => {
  const result = await context.dataSources.userAPI.cancelTrip(launchId);

  if (!result)
    return {
      success: false,
      message: 'failed to cancel trip',
    };

  const launch = await context.dataSources.launchAPI.getLaunchById(launchId);
  return {
    success: true,
    message: 'trip cancelled',
    launches: [launch],
  };
};
