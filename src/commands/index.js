const bookmark = require("./bookmark");
const search = require("./search");
const start = require("./start");

module.exports = (bot) => {
  bookmark(bot);
  search(bot);
  start(bot);

  return bot;
};
