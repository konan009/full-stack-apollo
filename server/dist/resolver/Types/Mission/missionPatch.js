"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.missionPatch = void 0;
const missionPatch = (mission, { size } = { size: 'LARGE' }) => {
    return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
};
exports.missionPatch = missionPatch;
