import { Context, MutationLoginArg } from '../../common/interfaces';
import { MutationUserReturn } from '../../common/interfaces';

export const loginUser = async (
  _: any,
  { email }: MutationLoginArg,
  context: Context
): Promise<MutationUserReturn> => {
  const user = await context.dataSources.userAPI.findOrCreateUser({ email });
  if (user) {
    user.token = Buffer.from(email).toString('base64');
    return user;
  }
};
