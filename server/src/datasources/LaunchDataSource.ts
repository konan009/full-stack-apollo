import { RESTDataSource } from 'apollo-datasource-rest';
import { SPACE_DATA_URL } from '../common/constants';
import {
  LaunchGetByIdsReturn,
  LaunchGetLaunchByIdReturn,
  LaunchReducerReturn,
  LaunchGetAllLaunchesReturn,
  LaunchGetLaunchByIdArg,
  LaunchGetByIdsArgs,
  LaunchDataSourceInterface,
} from '../common/interfaces';

export class LaunchDataSource extends RESTDataSource implements LaunchDataSourceInterface {
  constructor() {
    super();
    this.baseURL = SPACE_DATA_URL;
  }

  async getAllLaunches(): Promise<LaunchGetAllLaunchesReturn> {
    const response = await this.get('launches');
    return Array.isArray(response) ? response.map((launch) => this.launchReducer(launch)) : [];
  }

  launchReducer(launch: any): LaunchReducerReturn {
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

  async getLaunchById(launchId: LaunchGetLaunchByIdArg): Promise<LaunchGetLaunchByIdReturn> {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds(launchIds: LaunchGetByIdsArgs): Promise<LaunchGetByIdsReturn> {
    return Promise.all(launchIds.map((launchId: number) => this.getLaunchById(launchId)));
  }
}
