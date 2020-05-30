module.exports = (bot) =>
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `
  Welcome at <b>DevResourcesBot</b>, thank you for using the bot.
        
  Available commands:
          
  /bookmark <b>name</b> - save resource for later.
  /search <b>term</b> - search for resource.
  /start - show this menu.
          `,
      {
        parse_mode: "HTML",
      }
    );
  });
