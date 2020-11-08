const mongoose = require('mongoose');

var archiveSchema  = new mongoose.Schema({
	admin : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
	data : [{
		acadYear : String,
		groups  : [{
			members : [{
				name : String,
				email : String,
				rollno : String,
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
				name : {type:String,default:null},
				email : {type:String,default:null},
			},
			presentation : [{
				scheduled_date : {type :Date },
				marks : {type:String,default:null},
			}]
		}]	
	}]
})

var Archive = mongoose.model('Archive',archiveSchema);
module.exports  = Archive
