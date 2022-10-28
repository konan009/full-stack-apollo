import { Context, Record } from '../../common/interfaces';

export const me = (_ : any, __ : any, context : Context ) => {
    return context.dataSources.userAPI.findOrCreateUser()
}