/*
 * GraphQL schema
 * BEWARE known issue: Its not possible to handle timestamp values in ms
 * "message": "Int cannot represent non 32-bit signed integer value: 1503608145148"
 */

'use strict'

console.log('# Loading GraphQL schema ...')
var { buildSchema } = require('graphql');

exports.schema = buildSchema(`
    type Query {
      personGet(input: String): [Person]
    },
    type Mutation {
      personInsert(input: PersonInsertInput): Person
      personUpdate(input: PersonUpdateInput): Person
    },
    type Person {
      _id: String
      code: String
      name: String
      taxNumber: String
      address: String
      email: String
      phone: String
      created: Int
      updated: Int
    },
    input PersonInsertInput {
      code: String
      name: String
      taxNumber: String
      address: String
      email: String
      phone: String
    },
    input PersonUpdateInput {
      _id: String
      code: String
      name: String
      taxNumber: String
      address: String
      email: String
      phone: String
      created: Int
    }
`);
