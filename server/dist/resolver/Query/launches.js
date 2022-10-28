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
exports.launches = void 0;
const utils_1 = require("../../utils");
const launches = (_, { pageSize = 20, after }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
    const allLaunches = yield dataSources.launchAPI.getAllLaunches();
    allLaunches.reverse();
    const launches = (0, utils_1.paginateResults)({
        after,
        pageSize,
        results: allLaunches
    });
    const result = {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        hasMore: launches.length
            ? launches[launches.length - 1].cursor !==
                allLaunches[allLaunches.length - 1].cursor
            : false
    };
    return result;
});
exports.launches = launches;
