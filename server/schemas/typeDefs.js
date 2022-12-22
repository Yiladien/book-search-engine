// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
  }

  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(userId: ID!, input: BookInput): User
    removeBook(bookId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;

// type Auth {
//   token: ID!
//   user: User
// }

// type User {
//   _id: ID
//   username: String
//   email: String
// }

// type Mutation {
//   addBook(thoughtText: String!): Book
// }

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
