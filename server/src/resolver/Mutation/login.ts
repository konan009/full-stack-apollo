
import { Context, Record, MutationLoginArg } from '../../common/interfaces';

export const login = async (
    _ : any, 
    { email } : MutationLoginArg,
    context : Context
    ) => {
    const user = await context.dataSources.userAPI.findOrCreateUser({ email });
    if (user) {
        user.token = Buffer.from(email).toString('base64');
        return user;
    }
}