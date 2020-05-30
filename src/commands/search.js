const { debug, getResources, defaults } = require("../helpers");
const listSize = defaults._limit;
module.exports = (bot) =>
  bot.onText(/\/search/, (msg, match) => {
    debug({ msg, match });

    const chatId = msg.chat.id;
    let term = match.input;
    const pageIndex = term.indexOf("p-");
    let nextPage = Number(term.substring(pageIndex + 2));
    nextPage = isNaN(nextPage) ? 0 : nextPage;
    term = pageIndex > -1 ? term.replace("p-" + nextPage, "") : term;
    term = term.replace("/search", "").trim();

    debug({ term, nextPage });
    if (!term) {
      bot.sendMessage(chatId, "Please provide search term!");
      return;
    }

    getResources(
      { title_contains: term, _start: nextPage * listSize },
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

        const nextPageExist = resources.length < listSize ? false : true;

        inline_keyboard.push([
          {
            text: "Next page",
            callback_data: JSON.stringify({
              action: `search`,
              term,
              nextPage: nextPage + 1,
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
      bot.sendMessage(chatId, `searching for ${term} failed. (${e.message})`)
    );
  });
