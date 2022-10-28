"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const launches_1 = require("./launches");
const launch_1 = require("./launch");
const me_1 = require("./me");
exports.Query = {
    me: me_1.me,
    launch: launch_1.launch,
    launches: launches_1.launches
};
