const mongoose = require('mongoose');

var archiveSchema  = new mongoose.Schema({
	admin : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
	data : [{
		acadYear : String,
		members: [{
			name: String,
			email: String,
		}],
		project : {
			title: { type: String, default: null },
			specialization: { type: String, default: null },
			details: { type: String, default: null },
			agency: { type: String, default: null },
			method: { type: String, default: null },
			result: { type: String, default: null },
			requirements: { type: String, default: null },
			typeOfProject: { type: String, default: null },
			category: { type: String, default: null },
			attachPrints: { type: String, default: null },
		},
		addtionalDocuments: [{
			docName: { type: String, default: null },
			desc: { type: String, default: null },
			doclink: { type: String, default: null }
		}],
		guide : {
			name : {type:String,default:null},
			email : {type:String,default:null},
		},
	}]
})

var Archive = mongoose.model('Archive',archiveSchema);
module.exports  = Archive
