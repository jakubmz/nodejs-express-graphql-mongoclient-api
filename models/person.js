/*
 * person model
 */

'use strict'

console.log("# Loading person model ...");
require('dotenv').config();
const moment = require('moment');
const mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var person = {

  get: async (args) => {
    try {
      console.log('# person.get <<', args);
      const filter = args.input ? { $text: { $search: args.input } } : { };
      const client = await mongoClient.connect(process.env.DB_URL, { useNewUrlParser: true });
      const result = await client.db().collection('person').find(filter).toArray();
      console.log(`# person.get >> [Array of ${result.length}]`);
      await client.close();
      return result;
    } catch(error) {
      console.error(Error(error));
    }
  },

  insert: async (args) => {
    try {
      // TODO graphql validation
      console.log('# person.insert <<', args);
      const doc = {
        code: args.input.code,
        name: args.input.name,
        taxNumber: args.input.taxNumber,
        address: args.input.address,
        email: args.input.email,
        phone: args.input.phone,
        created: moment().format('X'),
        updated: null
      };
      const client = await mongoClient.connect(process.env.DB_URL, { useNewUrlParser: true })
      const result = await client.db().collection('person').insertOne(doc);
      await client.close();
      console.log('# person.insert >>', result.ops[0]);
      return result.ops[0];
    } catch(error) {
      console.log((Error(error)));
    }
  },

  update: async (args) => {
    try {
      // TODO graphql validation
      console.log('# person.update <<', args);
      const query = { _id: ObjectID(args.input._id) };
      const doc = {
        _id: ObjectID(args.input._id),
        code: args.input.code,
        name: args.input.name,
        taxNumber: args.input.taxNumber,
        address: args.input.address,
        email: args.input.email,
        phone: args.input.phone,
        created: args.input.created,
        updated: moment().format('X')
      };
      const client = await mongoClient.connect(process.env.DB_URL, { useNewUrlParser: true });
      const result = await client.db().collection('person').update(query, doc);
      if(result.result.nModified === 0) {
        console.log(Error(`update() _id:${doc._id} not found`));
      }
      await client.close();
      console.log('# person.update >>', result);
      return doc;
    } catch(error) {
      console.error(Error(error));
    }
  }
}

module.exports = person;
