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
exports.bookTrips = void 0;
const bookTrips = (_, { launchIds }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield dataSources.userAPI.bookTrips({ launchIds });
    const launches = yield dataSources.launchAPI.getLaunchesByIds({
        launchIds,
    });
    return {
        success: results && results.length === launchIds.length,
        message: results.length === launchIds.length
            ? 'trips booked successfully'
            : `the following launches couldn't be booked: ${launchIds.filter(id => !results.includes(id))}`,
        launches,
    };
});
exports.bookTrips = bookTrips;
