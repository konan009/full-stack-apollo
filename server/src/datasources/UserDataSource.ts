import { DataSource } from 'apollo-datasource';
import isEmail from 'isemail';
import {
  UserFindOrCreateUserArg,
  UserFindOrCreateUserReturn,
  UserBookTripReturn,
  UserBookTripsReturn,
  UserCancelTripReturn,
  UserGetLaunchIdsByUserReturn,
  UserIsBookedOnLaunchReturn,
  UserIsBookedOnLaunchArg,
  UserCancelTripArg,
  UserBookTripArg,
  UserBookTripsArg,
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
  initialize(config: any): void {
    this.context = config.context;
  }

  async findOrCreateUser({
    email: emailArg,
  }: UserFindOrCreateUserArg): Promise<UserFindOrCreateUserReturn> {
    const email = this.context && this.context.user ? this.context.user.email : emailArg;
    const users = await this.store.users.findOrCreate({ where: { email } });
    return users[0].dataValues;
  }

  async bookTrips(launchIds: UserBookTripsArg): Promise<UserBookTripsReturn> {
    const userId = this.context.user.id;
    if (!userId) return [];

    let results = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip(launchId);
      if (res) {
        results.push(res);
      }
    }

    return results;
  }

  async bookTrip(launchId: UserBookTripArg): Promise<UserBookTripReturn> {
    const userId = this.context.user.id;
    const res = await this.store.trips.findOrCreate({
      where: { userId, launchId },
    });

    const result = res && res.length ? res[0].get() : false;
    return result;
  }

  async cancelTrip(launchId: UserCancelTripArg): Promise<UserCancelTripReturn> {
    const userId = this.context.user.id;
    const result = !!this.store.trips.destroy({ where: { userId, launchId } });
    return result;
  }

  async getLaunchIdsByUser(): Promise<UserGetLaunchIdsByUserReturn> {
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map((l: any) => l.dataValues.launchId).filter((l: any) => !!l)
      : [];
  }

  async isBookedOnLaunch(launchId: UserIsBookedOnLaunchArg): Promise<UserIsBookedOnLaunchReturn> {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId, launchId },
    });

    const result = found && found.length > 0;
    return result;
  }
}
