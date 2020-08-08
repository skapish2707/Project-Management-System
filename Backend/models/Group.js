const mongoose = require('mongoose');

var groupSchema  = new mongoose.Schema({
	name : String,
	admin : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
	members : [{
		type : mongoose.Schema.Types.ObjectId,
		ref :'User'
	}],
	comments : [{
		author : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
		text : String,
		time : { type : Date, default: Date.now },
	}],
});

var Group = mongoose.model('Group',groupSchema);
module.exports  = Group