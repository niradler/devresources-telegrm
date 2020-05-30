require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const commands = require("./commands");
const callback = require("./callback");
const token = process.env.TOKEN;
const { getPool } = require("./helpers");

const bot = new TelegramBot(token, {
  polling: true,
});

commands(bot);
callback(bot);

console.log("running...", new Date());
