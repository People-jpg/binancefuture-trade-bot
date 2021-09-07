require('dotenv').config()
require("./configs/database").connect();

const express = require('express')
const http = require("http");
const app = express();  
const server = http.createServer(app);
const cookieParser = require("cookie-parser");


const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const { convertTextToJson } = require('./utils/convertTextToJson');

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const manageRoutes = require('./routes/manage');

const tokenMiddle = require('./middlewares/token.middleware');

var cors = require('cors');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", "./views");
app.set("view engine", "pug");
app.use(cookieParser('secret'));

app.use(function(req, res, next) {
  res.header('application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// telegram bot
bot.start((ctx) => console.log('Welcome'))
bot.on('text', async (ctx) => {
  const text = convertTextToJson(ctx.message.text);

  if (!text) return
  ctx.reply(text)
})
bot.launch()

app.use("/", homeRoutes);
app.use("/user", userRoutes);
app.use("/manage", tokenMiddle.verifyToken, manageRoutes);

app.use(cors());
app.options('*', cors());

server.listen(5000, () => console.log(`Listening on port ${5000}`));
