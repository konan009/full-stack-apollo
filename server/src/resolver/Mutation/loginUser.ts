import { Context, MutationLoginArg } from '../../common/interfaces';
import { MutationUserReturn, MutationLoginParent } from '../../common/interfaces';

export const loginUser = async (
  _: MutationLoginParent,
  { email }: MutationLoginArg,
  context: Context
): Promise<MutationUserReturn> => {
  const user = await context.dataSources.userAPI.findOrCreateUser({ email });
  if (user) {
    user.token = Buffer.from(email).toString('base64');
    return user;
  }
};
