"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const bookTrips_1 = require("./bookTrips");
const login_1 = require("./login");
const cancelTrip_1 = require("./cancelTrip");
exports.Mutation = {
    bookTrips: bookTrips_1.bookTrips,
    login: login_1.login,
    cancelTrip: cancelTrip_1.cancelTrip
};
