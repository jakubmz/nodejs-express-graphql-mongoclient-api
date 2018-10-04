/*
 * nodejs-express-graphql-mongoclient-api
 */
'use strict';

require('dotenv').config();
const express = require('express');
const express_graphql = require('express-graphql');
const graphql = require('./graphql/schema.js');
const handlebars = require('handlebars');
const fs = require('fs');
const moment = require('moment');
/*
 * Load models
 */
const person = require('./models/person')

const utils = require('./utils/utils.js');
const API_URI = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${process.env.SERVER_URL_API}`;

/*
 * GraphQL API endpoint / methods
 */
var root = {
  personGet: person.get,
  personInsert: person.insert,
  personUpdate: person.update,
};
const app = express();
app.use(process.env.SERVER_URL_API, express_graphql({
  schema: graphql.schema,
  rootValue: root,
  graphiql: true
}));

/*
 * Api help page with graphiql examples
 */
app.get(process.env.SERVER_URL_API_HELP, function (req, res) {
  console.log("# api-help ...");
  var context = { title: 'nodejs-express-graphql-mongoclient-api - GhraphQL queries and variables' };
  var source = fs.readFileSync('./templates/api-help.hbs', 'utf8');
  var template = handlebars.compile(source, { strict: true });
  res.send(template(context));
});

/*
 * Start server
 */
console.log(process.env);
app.listen(process.env.SERVER_PORT, () => {
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log('# ------------------------------------------------------------------------');
  console.log('# Server / GraphQL API now running on localhost:8084/api');
  console.log(`# [${process.env.npm_package_scripts_start}] MEMORY USE APPROX: ${memoryUsed} MB`);
  console.log('# ------------------------------------------------------------------------');
});
