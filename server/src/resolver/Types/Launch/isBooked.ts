import { Context, LaunchIsBookedParent } from '../../../common/interfaces';

export const isBooked = async (launch: LaunchIsBookedParent, _: any, context: Context) => {
  return context.dataSources.userAPI.isBookedOnLaunch(launch.id);
};
