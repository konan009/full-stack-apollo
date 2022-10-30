import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    loginUser(email: String): User
  }

  type Query {
    launches(pageSize: Int, after: String): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String @upper
    launches: [Launch]
  }
`;
