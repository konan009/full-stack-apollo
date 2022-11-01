import { Context, LaunchIsBookedParent, LaunchIsBookedArgs } from '../../../common/interfaces';

export const isBooked = async (
  launch: LaunchIsBookedParent,
  _: LaunchIsBookedArgs,
  context: Context
) => {
  return context.dataSources.userAPI.isBookedOnLaunch(launch.id);
};
