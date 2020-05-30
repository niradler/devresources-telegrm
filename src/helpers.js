const fetch = require("node-fetch");
const querystring = require("querystring");
const Pool = require("pg").Pool;

let pool;
const listSize = 5;
const defaults = { _limit: listSize };

const getResources = (filter, cb) => {
  let queryString = querystring.stringify({ ...filter, ...defaults });

  return fetch(`https://api.devresources.site/resources?${queryString}`)
    .then((res) => res.json())
    .then((data) => cb(data));
};

const debug = (...args) =>
  process.env.NODE_ENV != "prod" && console.log(...args);

const getPool = () => {
  if (!pool)
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

  return pool;
};

module.exports = {
  debug,
  getResources,
  defaults,
  getPool,
};
