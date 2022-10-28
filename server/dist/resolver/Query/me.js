"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
const me = (_, __, { dataSources }) => {
    return dataSources.userAPI.findOrCreateUser();
};
exports.me = me;
