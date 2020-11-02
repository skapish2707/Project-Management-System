const mongoose = require('mongoose');

var groupSchema  = new mongoose.Schema({
	name : String,
	admin : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
	dueDate : {type : Date},
	acadYear : String,
	department : String,
	members : [{
		name : String,
		email : String,
		rollno : String,
	}],
	comments : [{
		author : String,
		text : String,
		time : { type : Date, default: Date.now },
	}],
	proposals : [{
		title : String,
		specialization : String,
		details : String,
		agency : String,
		method : String,
		result : String,
		requirements : String,
		attachPrints : String, 
		approval : {
			admin : { type :Boolean,default:false },
			hod : { type :Boolean,default:false },
		},
		applied : {
			type : Date,
			default: Date.now 
		},
	}],
	guide : {
		name : String,
		email : String,
	},
	presentation : [{
		number : Number,
		scheduled_date : {type :Date },
		marks : String,
	}]
});

var Group = mongoose.model('Group',groupSchema);
module.exports  = Group