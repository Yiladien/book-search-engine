// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(thoughtText: String!): Book
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;

// type Thought {
//   _id: ID
//   thoughtText: String
//   createdAt: String
//   username: String
//   reactionCount: Int
//   reactions: [Reaction]
// }

// type Reaction {
//   _id: ID
//   reactionBody: String
//   createdAt: String
//   username: String
// }

// type Query {
//   me: User
//   users: [User]
//   user(username: String!): User
//   thoughts(username: String): [Thought]
//   thought(_id: ID!): Thought
// }
