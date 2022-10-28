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
exports.LaunchDataSource = void 0;
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const constants_1 = require("../constants");
class LaunchDataSource extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = constants_1.SPACE_DATA_URL;
    }
    getAllLaunches() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('launches');
            return Array.isArray(response)
                ? response.map(launch => this.launchReducer(launch))
                : [];
        });
    }
    launchReducer(launch) {
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.launch_date_unix}`,
            site: launch.launch_site && launch.launch_site.site_name,
            mission: {
                name: launch.mission_name,
                missionPatchSmall: launch.links.mission_patch_small,
                missionPatchLarge: launch.links.mission_patch,
            },
            rocket: {
                id: launch.rocket.rocket_id,
                name: launch.rocket.rocket_name,
                type: launch.rocket.rocket_type,
            },
        };
    }
    getLaunchById(launchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('launches', { flight_number: launchId });
            return this.launchReducer(response[0]);
        });
    }
    getLaunchesByIds(launchIds) {
        return Promise.all(launchIds.map((launchId) => this.getLaunchById(launchId)));
    }
}
exports.LaunchDataSource = LaunchDataSource;
