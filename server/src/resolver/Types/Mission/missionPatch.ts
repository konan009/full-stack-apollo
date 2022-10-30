import {
  MissionPatchReturn,
  MissionPatchArg,
  MissionPatchParent,
} from '../../../common/interfaces';

export const missionPatch = (
  mission: MissionPatchParent,
  { size }: MissionPatchArg
): MissionPatchReturn => {
  return size === 'SMALL' ? mission.missionPatchSmall : mission.missionPatchLarge;
};
