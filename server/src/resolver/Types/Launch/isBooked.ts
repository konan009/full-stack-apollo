import { Context, Record } from '../../../common/interfaces';

export const isBooked = async (launch : Record<string, unknown>, _ : any, context : Context ) =>  context.dataSources.userAPI.isBookedOnLaunch(launch.id);