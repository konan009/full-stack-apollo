import { Context, Record, QueryLaunchArgs} from '../../common/interfaces';

export const launch = (
    _ : any, 
    { id } : QueryLaunchArgs, 
    context : Context 
    ) => 
    {
    return  context.dataSources.launchAPI.getLaunchById( id )
}