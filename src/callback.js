const { debug, getResources, defaults } = require("./helpers");
const listSize = defaults._limit;
module.exports = (bot) =>
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;

    let data = callbackQuery.data;
    data = JSON.parse(data);
    debug({ message, data });
    if (!data)
      return bot.sendMessage(message.chat.id, `Missing data, ${data}.`);
    switch (data.action) {
      case "show":
        getResources({ id_eq: data.id }, (resources) => {
          resources = resources || [];
          const resource = resources[0];
          if (!resource)
            return bot.sendMessage(message.chat.id, `Resource not found.`);
          bot.sendMessage(
            message.chat.id,
            `*${resource.title}*
        ${resource.description}
        [Visit](${resource.link})
                 `,
            {
              parse_mode: "Markdown",
            }
          );
        }).catch((e) =>
          bot.sendMessage(
            message.chat.id,
            `fetching for ${data} failed. (${e.message})`
          )
        );
        break;
      case "search":
        getResources(
          { title_contains: data.term, _start: data.nextPage * listSize },
          (resources) => {
            resources = resources || [];
            debug({ resources });

            const resourcesToShow = resources.slice(0, listSize);
            if (resourcesToShow.length == 0)
              return bot.sendMessage(chatId, `Not found.`);

            let inline_keyboard = [
              ...resourcesToShow.map((resource) => [
                {
                  text: resource.title,
                  callback_data: JSON.stringify({
                    action: "show",
                    id: resource._id,
                  }),
                },
              ]),
            ];

            inline_keyboard.push([
              {
                text: "Next page",
                callback_data: JSON.stringify({
                  action: `search`,
                  term: data.term,
                  nextPage: data.nextPage + 1,
                }),
              },
            ]);

            bot.sendMessage(chatId, `Pick Resource to get details.`, {
              reply_markup: {
                inline_keyboard,
              },
            });
          }
        ).catch((e) =>
          bot.sendMessage(
            chatId,
            `searching for ${data.term} failed. (${e.message})`
          )
        );
        break;
      default:
        bot.sendMessage(message.chat.id, `Not Found. (${data.action})`);
        break;
    }
  });
