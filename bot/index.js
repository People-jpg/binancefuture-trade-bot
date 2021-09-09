const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const { convertTextToJson } = require('../utils/convertTextToJson');
const Binance = require('node-binance-api');

const binance = new Binance().options({
  APIKEY: 'eaaaaecaa52e675b266ce0834f21d330f29655f791c507d15f766f66c89d173d',
  APISECRET: 'd111e8cf205fab1a0ef5242f0fed5e97767621acac47eff32315842c19e68d69',
  useServerTime: true,
  test: true
});

let allPrices = [];

binance.futuresMarkPriceStream((data) => {
  allPrices = data;
});

// telegram bot
bot.on('text', async (ctx) => {
  const entryData = convertTextToJson(ctx.message.text);
  if (!entryData) return

  const marketData = allPrices.filter((item) => item.symbol === entryData.symbol)[0];
  
  console.log(entryData.entry, marketData.markPrice)
  if (entryData.entry >= marketData.markPrice) {
    console.log("market order");
    // console.info(await binance.futuresMarketBuy(marketData.symbol, entryData.entry));
    console.info( await binance.futuresMarketBuy( marketData.symbol, 5 ) );
  }
  if (entryData.entry < marketData.markPrice) {
    console.log("limit order");
    // console.info(await binance.futuresBuy(marketData.symbol, entryData.entry, entryData.stopLoss));
    console.info( await binance.futuresBuy( marketData.symbol, 0.1, 46800 ) );
  }

  return;
})
bot.launch()