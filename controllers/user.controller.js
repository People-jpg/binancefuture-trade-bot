var User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: 'Ws1DBIM8PNi2bMYLmLVJHw3DswhnYewbrUu4HjyToNe9R82LYUUHeZx9vIjC3Ss7',
  APISECRET: 'b7VescR4OAnra4PBeqSNFVlHONqLFfxPSJV7c5mIz15sCKa1xFcPdWVRdpeVW1wt'
});

module.exports.index = async function (req, res) {
	let orders = [
		{
			symbol:"BTCUSDT",
			side: "BUY",
			type: "MARKET",
			quantity: "0.01",
		},
		{
			symbol:"BNBUSDT",
			side: "SELL",
			type: "MARKET",
			quantity: "0.5",
		}
	]

	console.info( await binance.futuresMultipleOrders(orders) );
}


module.exports.login = async function (req, res) {
  const { user, password } = req.body;
 
	var userEntity = await User.findOne({ user });

	if (!userEntity) {
		return res.render("index", {
			error: 'User not found!'
		});
	}

	const validPassword = await bcrypt.compare(password, userEntity.password);
	if (!validPassword) {
		return res.render("index", {
			error: 'Wrong password!'
		});
	} 

	const token = jwt.sign({ user }, process.env.SECRET);
	res.cookie('token', token, {
    signed: true
  });
	res.redirect('/manage');
}

module.exports.register = async function (req, res) {
  const { user, password } = req.body;
  const oldUser = await User.findOne({ user });

	if (oldUser) {
		return res.render("index", {
			error: 'Email already exists!'
		});
	}
	
	const salt = await bcrypt.genSalt();
	password = await bcrypt.hash(password, salt);

	const data = {
		user,
    password,
    create_at: new Date(),
	}

  await User.create(data);
  
	res.redirect('/');
}