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
  
export type ContextUser = {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    token: string;
}

export interface Context {
    user?: ContextUser;
    dataSources: {
        launchAPI: LaunchDataSource;
        userAPI: UserDataSource;
    };
}
 

// For Query ResolverArg
export  type QueryLaunchArgs = {
    id: Scalars['Int'];
};



// For Mutation Resolver
export  type MutationCancelTripArgs = {
    launchId: Scalars['Int'];
};

export  type MutationBookTripsArg = {
    launchIds: number[];
};

export  type MutationLoginArg = {
    email: Scalars['String'];
};

