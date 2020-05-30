const { debug } = require("../helpers");

module.exports = (bot) =>
  bot.onText(/\/bookmark/, (msg, match) => {
    debug(msg, match);

    const chatId = msg.chat.id;
    const name = match.input.split(" ")[1];

    if (name === undefined) {
      bot.sendMessage(chatId, "Please provide name of resource!");
      return;
    }

    bot.sendMessage(
      chatId,
      `Resource: ${name} have been save. (still in demo)`
    );
  });
