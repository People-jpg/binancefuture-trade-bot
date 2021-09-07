const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	create_at: Date,
	name: String,
	user: String,
	password: String,
	},
    {
    	versionKey: false
    }
)

var User = mongoose.model('User', userSchema, 'user');

module.exports = User;