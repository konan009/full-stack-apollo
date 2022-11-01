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

export interface PaginateArg {
  after: string | undefined;
  pageSize: number;
  results: Launch[];
  getCursor?: () => null;
}

export interface User {
  id: number;
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Context {
  user?: User;
  dataSources: {
    launchAPI: LaunchDataSource;
    userAPI: UserDataSource;
  };
}
export interface Mission {
  name: String;
  missionPatchSmall: String;
  missionPatchLarge: String;
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
}

export interface Launch {
  id: number;
  cursor: string;
  site: string;
  mission: Mission;
  rocket: Rocket;
}

export interface BookTrip {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  launchId: number;
  userId: number;
}

// DATA RESOURCE RETURN FOR LAUNCHES
export type UserFindOrCreateUserArg = {
  email?: string;
};
export type UserGetLaunchIdsByUserReturn = number[];
export type UserFindOrCreateUserReturn = User;

export type UserCancelTripReturn = boolean;
export type UserCancelTripArg = number;

export type UserIsBookedOnLaunchReturn = boolean;
export type UserIsBookedOnLaunchArg = number;

export type UserBookTripArg = number;

export type UserBookTripReturn = BookTrip | false;

export type UserBookTripsArg = number[];
export type UserBookTripsReturn = BookTrip[];

// DATA RESOURCE RETURN FOR USER
export type LaunchGetLaunchByIdResponse = Launch;
export type LaunchGetLaunchByIdArg = number;
export type LaunchReducerResponse = Launch;
export type LaunchGetByIdsResponse = Launch[];
export type LaunchGetByIdsArgs = number[];
export type LaunchGetAllLaunchesResponse = Launch[];

// FOR MUTATION
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
export type MutationUserReturn = User | undefined;

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
