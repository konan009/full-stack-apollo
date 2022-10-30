import { DataSource } from 'apollo-datasource';
import isEmail from 'isemail';
import {
  EmailArgument,
  UserFindOrCreateUserResponse,
  UserBookTripResponse,
  UserBookTripsResponse,
  UserCancelTripResponse,
  UserGetLaunchIdsByUser,
} from '../common/interfaces';
export class UserDataSource extends DataSource {
  store: any;
  context: any;

  constructor({ store }: { store: any }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: any) {
    this.context = config.context;
  }

  async findOrCreateUser({
    email: emailArg,
  }: EmailArgument): Promise<UserFindOrCreateUserResponse> {
    const email = this.context && this.context.user ? this.context.user.email : emailArg;
    const users = await this.store.users.findOrCreate({ where: { email } });
    return users[0].dataValues;
  }

  async bookTrips(launchIds: number[]): Promise<UserBookTripsResponse> {
    const userId = this.context.user.id;
    if (!userId) return [];

    let results = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip(launchId);
      if (res) results.push(res);
    }

    return results;
  }

  async bookTrip(launchId: string | number): Promise<UserBookTripResponse> {
    const userId = this.context.user.id;
    const res = await this.store.trips.findOrCreate({
      where: { userId, launchId },
    });

    const result = res && res.length ? res[0].get() : false;
    return result;
  }

  async cancelTrip(launchId: number): Promise<UserCancelTripResponse> {
    const userId = this.context.user.id;
    const result = !!this.store.trips.destroy({ where: { userId, launchId } });
    return result;
  }

  async getLaunchIdsByUser(): Promise<UserGetLaunchIdsByUser> {
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map((l: any) => l.dataValues.launchId).filter((l: any) => !!l)
      : [];
  }

  async isBookedOnLaunch(launchId: any) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId, launchId },
    });
    return found && found.length > 0;
  }
}

module.exports = UserDataSource;
