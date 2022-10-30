import { LaunchDataSource, UserDataSource } from '../../datasources';

type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type PaginateArg = {
  after: string | undefined;
  pageSize: number;
  results: Launch[];
  getCursor?: () => null;
};

export type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  token: string;
};

export interface Context {
  user?: User;
  dataSources: {
    launchAPI: LaunchDataSource;
    userAPI: UserDataSource;
  };
}
export type Mission = {
  name: String;
  missionPatchSmall: String;
  missionPatchLarge: String;
};

export type Rocket = {
  id: string;
  name: string;
  type: string;
};

export type Launch = {
  id: number;
  cursor: string;
  site: string;
  mission: Mission;
  rocket: Rocket;
};

export type EmailArgument = {
  email?: string;
};

// DATA RESOURCE RETURN FOR LAUNCHES
export type UserGetLaunchIdsByUser = number[];

export type UserFindOrCreateUserResponse = User;

export type UserCancelTripResponse = boolean;

export type UserBookTripResponse =
  | {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      launchId: number;
      userId: number;
    }
  | false;

export type UserBookTripsResponse = UserBookTripResponse[];

// DATA RESOURCE RETURN FOR USER
export type LaunchGetLaunchByIdResponse = Launch;
export type LaunchGetByIdsResponse = Launch[];
export type LaunchReducerResponse = Launch;
export type LaunchGetAllLaunchesResponse = Launch[];

// For Mutation
export type MutationCancelTripArgs = {
  launchId: Scalars['Int'];
};

export type MutationBookTripsArg = {
  launchIds: number[];
};

export type MutationLoginArg = {
  email: Scalars['String'];
};

export type MutationBookTripReturn = {
  success: boolean;
  message: string;
  launches?: Launch[];
};

export type MutationCancelTripReturn = {
  success: boolean;
  message: string;
  launches?: Launch[];
};

export type MutationUserReturn =
  | {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      token?: string;
    }
  | undefined;

// For Query
export type QueryLaunchParent = undefined;

export type QueryLaunchArgs = {
  id: Scalars['Int'];
};

export type QueryLaunchReturn = Launch;

export type QueryLaunchesArgs = {
  pageSize: number;
  after: string;
};

export type QueryLaunchesReturn = {
  cursor: string;
  hasMore: boolean;
  launches: Launch[];
};

export type QueryMeReturn = User;

// Mission Object Type

export type MissionPatchReturn = String;

export type MissionPatchArg = {
  size: string;
};

export type MissionPatchParent = Mission;

// Launch Object Type
export type LaunchIsBookedParent = Launch;
