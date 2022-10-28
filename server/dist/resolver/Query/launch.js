"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch = void 0;
const launch = (_, { id }, context) => {
    return context.dataSources.launchAPI.getLaunchById({ launchId: id });
};
exports.launch = launch;
