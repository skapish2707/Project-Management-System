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
		rollno : Number,
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
		scheduled_date : {type :Date },
		filled : {type : Boolean ,default:false},
		orgMarks : {type:Number,default:0},
		subKnowMarks : {type:Number,default:0},
		EODMarks : {type:Number,default:0},
		timeMarks : {type:Number,default:0}
	}],
	weeklyMeetLog : [{
		scheduled_date:{type:Date},
		remark : {type:String,default:null}
	}],
	report : {
		filled : {type : Boolean ,default:false},
		orgAndWriting : {type:Number,default:0},
		enggTheoryAnaly: {type:Number,default:0},
		biblogrpahy: {type:Number,default:0},
		spellAndGrammar : {type:Number,default:0},
		diagrams : {type:Number,default:0}
	},
	implementation :{
		filled : {type : Boolean ,default:false},
		probStatment : {type:Number,default:0},
		concept : {type:Number,default:0},
		innovation : {type:Number,default:0},
		teamwork : {type:Number,default:0},
		pmf : {type:Number,default:0}
	}

});

var Group = mongoose.model('Group',groupSchema);
module.exports  = Group