import { Context } from '../../common/interfaces';
import { QueryMeReturn } from "../../common/interfaces";

export const me = (_ : any, __ : any, context : Context ) : Promise<QueryMeReturn> => {
    return context.dataSources.userAPI.findOrCreateUser({})
}