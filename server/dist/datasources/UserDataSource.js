"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataSource = void 0;
const apollo_datasource_1 = require("apollo-datasource");
class UserDataSource extends apollo_datasource_1.DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
        this.context = config.context;
    }
    /**
     * User can be called with an argument that includes email, but it doesn't
     * have to be. If the user is already on the context, it will use that user
     * instead
     */
    // async findOrCreateUser({ email: emailArg } = {}) {
    //   const email =
    //     this.context && this.context.user ? this.context.user.email : emailArg;
    //   if (!email || !isEmail.validate(email)) return null;
    //   const users = await this.store.users.findOrCreate({ where: { email } });
    //   return users && users[0] ? users[0] : null;
    // }
    findOrCreateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return "mugaddan@shipserv.com";
            // const email =
            //   this.context && this.context.user ? this.context.user.email : emailArg;
            // if (!email || !isEmail.validate(email)) return null;
            // const users = await this.store.users.findOrCreate({ where: { email } });
            // return users && users[0] ? users[0] : null;
        });
    }
    bookTrips(launchIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.context.user.id;
            if (!userId)
                return;
            // let test  = await this.store.trips.findAll({where:{ launchId : launchIds, userId : userId}});
            let results = [];
            // for each launch id, try to book the trip and add it to the results array
            // if successful
            for (const launchId of launchIds) {
                const res = yield this.bookTrip(launchId);
                if (res)
                    results.push(res);
            }
            return results;
        });
    }
    bookTrip(launchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.context.user.id;
            const res = yield this.store.trips.findOrCreate({
                where: { userId, launchId },
            });
            return res && res.length ? res[0].get() : false;
        });
    }
    cancelTrip(launchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.context.user.id;
            return !!this.store.trips.destroy({ where: { userId, launchId } });
        });
    }
    getLaunchIdsByUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
            // const userId = this.context.user.id;
            // const found = await this.store.trips.findAll({
            //   where: { userId },
            // });
            // return found && found.length
            //   ? found.map(l => l.dataValues.launchId ).filter(l => !!l)
            //   : [];
        });
    }
    isBookedOnLaunch(launchId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.context || !this.context.user)
                return false;
            const userId = this.context.user.id;
            const found = yield this.store.trips.findAll({
                where: { userId, launchId },
            });
            return found && found.length > 0;
        });
    }
}
exports.UserDataSource = UserDataSource;
module.exports = UserDataSource;
