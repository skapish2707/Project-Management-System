var mongoose = require("mongoose");
var User = require("../models/User");
var Group = require("../models/Group");
var Archive = require("../models/Archive");
var bcrypt = require("bcrypt");
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var ExcelJS = require("exceljs");

var sendmail = require("./sendmail");
var mediaServer = require("./mediaServer");

mongoose.connect(
	process.env.uri,
	{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
	},
	function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to database");
		// Group.find({}, (err,data)=>{
		//   data.forEach( (grp)=>{
		//     grp.addedToArchive = false;
		//     grp.save( (err)=>{
		//       console.log(err)
		//     } )
		//   } )
		// } )
		// User.find({$and: [ {type:{$ne:"admin"}} , {type:{$ne:"yami"}} ] }  , (err,data)=>{
		//   data.forEach( (u)=>{
		//     console.log(u.email , u.type)
		//   } )
		// })
		// User.deleteMany({$and: [ {type:{$ne:"admin"}} , {type:{$ne:"yami"}} ]} , (err)=>{
		//   console.log(err)
		// })
	}
	}
);

function makePassword(length) {
	var result = "";
	var characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
	result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function changePassword(user, newPassword) {
	return User.findById(user.id, function (err, user) {
	if (err) return false;
	return bcrypt.hash(newPassword, 10, function (err, hash) {
		if (err) return false;
		user.password = hash;
		return user.save(function (err, user) {
		if (err) return false;
		else return true;
		});
	});
	});
}
function saveLocallyForDevelopment(email, password) {
	line = email + "," + password + "\n";
	fs.appendFile("credentials.txt", line, function (err) {
	if (err) console.log(err);
	});
}

async function generateGroups(admin, dueDate, acadYear, users) {
	for (let i = 0; i < users.length; i++) {
	let user = users[i];
	let groupName = user[3].toLowerCase().trim().replace(/ /g, "");
	let group = await Group.findOne({ name: groupName, admin: admin.id });
	if (!group) {
		group = await Group({
		name: groupName,
		department: admin.department,
		members: [],
		admin: admin.id,
		dueDate: dueDate,
		acadYear: acadYear,
		guide: {
			name: null,
			email: null
		}
		});
	}
	group.members.push({
		name: user[0],
		email: user[2],
		rollno: user[1]
	});
	await group.save();
	}
}

async function addToDatabase(
	admin,
	name,
	rollno,
	email,
	department,
	type,
	groupName = null
) {
	if (await User.findOne({ email: email })) {
	console.log("a user with that email already exist");
	return;
	}
	password = makePassword(8);
	if (admin)
	data = {
		admin_name: "by " + admin.name[0].toUpperCase() + admin.name.substring(1),
		email: email,
		password: password,
		name: name,
		link: process.env.HOST
	};
	else data = { admin_name: "", email: email, password: password, name: name, link: process.env.HOST  };
	if (process.env.NODE_ENV == "production") sendmail(data, "registeration");
	else saveLocallyForDevelopment(email, password);
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	var user = User();
	user.email = email;
	user.password = hash;
	user.department = department;
	user.type = type;
	if (rollno) user.rollno = rollno;
	if (name) user.name = name;
	if (admin) user.admin = admin.id;
	if (groupName) {
	var name = groupName.toLowerCase().trim().replace(/ /g, "");
	user.groupName = name;
	}
	await user.save();
	console.log(user);
	return user;
}
async function addMemberToGroup(groupId, student) {
	member = {
	name: student.name,
	email: student.email,
	rollno: student.rollno
	};
	group = await Group.findById(groupId);
	group.members.push(member);
	await group.save();
}

async function updateDueDate(admin, dueDate) {
	Group.find({ admin: admin.id }, function (err, groups) {
	if (err) console.log(err);
	groups.forEach(function (group) {
		group.dueDate = dueDate;
		group.save();
	});
	});
}

async function getStudents(user, by) {
	let admin = null;
	if (user.type == "admin") admin = user.id;
	else admin = user.admin;
	let items = [];
	if (by == "name") {
	students = await User.find({ type: "student", admin: admin });
	for (let i = 0; i < students.length; i++) {
		let student = students[i];
		items.push({
		email: student.email,
		groupName: student.groupName,
		department: student.department
		});
	}
	} else if (by == "group") {
	groups = await Group.find({ admin: admin });
	for (let i = 0; i < groups.length; i++) {
		items.push({
		id: groups[i].id,
		name: groups[i].name,
		members: groups[i].members,
		comments: groups[i].comments,
		proposals: groups[i].proposals,
		dueDate: groups[i].dueDate,
		acadYear: groups[i].acadYear,
		guide: groups[i].guide,
		presentation: groups[i].presentation,
		department: groups[i].department,
		weeklyMeetLog: groups[i].weeklyMeetLog,
		report: groups[i].report,
		implementation: groups[i].implementation,
		addtionalDocuments: groups[i].addtionalDocuments
		});
	}
	}
	return items;
}

async function addProposals(student, proposals) {
	grp = await Group.findOne({ admin: student.admin, name: student.groupName });
	grp.proposals.forEach(function (proposal) {
	fs.unlink(
		path.join(".", "proposal", proposal.attachPrints),
		function (err) {
		if (err) console.log(err);
		console.log("deleted proposals");
		}
	);
	});
	grp.proposals = proposals;
	await grp.save();

	// await Group.findOneAndUpdate({admin:student.admin,name:student.groupName},{proposals:proposals});
}

async function addComment(staff, groupId, msg) {
	group = await Group.findById(groupId.trim());
	group.comments.push({
	author: staff.email,
	text: msg.trim()
	});
	await group.save();
}

async function addGuide(email, name, groupId) {
	await Group.findByIdAndUpdate(groupId.trim(), {
	guide: { name: name.trim(), email: email.trim() }
	});
	updateArchive(groupId.trim())
}

async function getGuide(admin) {
	guides = await User.find({ admin: admin.id, type: "guide" });
	let custom_guides = [];
	for (let i = 0; i < guides.length; i++) {
	custom_guides.push({
		id: guides[i].id,
		name: guides[i].name,
		email: guides[i].email,
		type: "guide"
	});
	}
	hod = await User.findOne({ admin: admin.id, type: "hod" });
	if (hod) {
	custom_guides.push({
		id: hod.id,
		name: hod.name,
		email: hod.email,
		type: "hod"
	});
	}
	return custom_guides;
}
async function getGuideGroups(user) {
	groups = await Group.find({
	admin: user.admin,
	guide: { name: user.name, email: user.email }
	});
	list_groups = [];
	for (let i = 0; i < groups.length; ++i) {
	// if(groups[i].guide.email && groups[i].guide.email.trim() == user.email.trim())
	list_groups.push({
		id: groups[i].id,
		department: groups[i].department,
		name: groups[i].name,
		members: groups[i].members,
		proposals: groups[i].proposals,
		dueDate: groups[i].dueDate,
		acadYear: groups[i].acadYear,
		presentation: groups[i].presentation,
		comments: groups[i].comments,
		weeklyMeetLog: groups[i].weeklyMeetLog,
		report: groups[i].report,
		implementation: groups[i].implementation,
		addtionalDocuments : groups[i].addtionalDocuments
	});
	}
	return list_groups;
}

async function presentation(gid, datetime) {
	grp = await Group.findById(gid);
	grp.presentation.push({
	scheduled_date: datetime
	});
	await grp.save();
}
async function updateMarks(gid, pid, marks) {
	grp = await Group.findById(gid);
	for (let i = 0; i < grp.presentation.length; ++i) {
	if (grp.presentation[i]._id == pid) {
		grp.presentation[i].marks = marks;
		// grp.presentation[i].orgMarks = orgMarks;
		// grp.presentation[i].subKnowMarks = subKnowMarks;
		// grp.presentation[i].EODMarks = EODMarks;
		// grp.presentation[i].timeMarks = timeMarks;
		// grp.presentation[i].filled = true;
		break;
	}
	}
	await grp.save();
}
async function deletePresentation(gid, pid) {
	grp = await Group.findById(gid);
	let index = null;
	for (let i = 0; i < grp.presentation.length; ++i) {
	if (grp.presentation[i]._id == pid) {
		index = i;
		break;
	}
	}
	grp.presentation.splice(index, 1);
	await grp.save();
}
async function deleteguide(id, guide) {
	await User.findByIdAndDelete(id);
	console.log(`DELETED GUIDE name :${guide.name} email ${guide.email}`);
	Group.find({ guide: guide }, function (err, data) {
	if (err) console.log(err);
	data.forEach(function (grp) {
		grp.guide = { name: null, email: null };
		grp.save(function (err) {
		if (err) console.log(err);
		});
	});
	});
}

async function deletehod(id) {
	await User.findByIdAndDelete(id);
}
async function deleteStudent(gid, email) {
	await User.findOneAndDelete({ email: email });
	grp = await Group.findById(gid);
	let index = null;
	for (let i = 0; i < grp.members.length; ++i) {
	if (grp.members[i].email == email) {
		index = i;
		break;
	}
	}
	grp.members.splice(index, 1);
	grp.save(function (err) {
	if (err) console.log(err);
	});
}

async function deleteProposal(gid) {
	grp = await Group.findById(gid);
	grp.proposals.forEach(function (proposal) {
	mediaServer.deleteFile(proposal.attachPrints);
	// fs.unlink(path.join(".", "proposal", proposal.attachPrints), function (
	//   err
	// ) {
	//   if (err) console.log(err);
	//   console.log("deleted proposals");
	// });
	});
	grp.proposals = [];
	await grp.save();
}

async function approve(groupId, proposalId, staff) {
	group = await Group.findById(groupId.trim());
	for (let i = 0; i < group.proposals.length; i++) {
	if (group.proposals[i].id == proposalId.trim()) {
		if (staff == "admin") {
		group.proposals[i].approval.admin = true;
		} else if (staff == "hod") {
		group.proposals[i].approval.hod = true;
		// updateArchive(groupId)
		}
	} else {
		if (staff == "admin") {
		group.proposals[i].approval.admin = false;
		} else if (staff == "hod") {
		group.proposals[i].approval.hod = false;
		}
	}
	}
	await group.save();
}

async function getGroup(student) {
	group = await Group.findOne({
	name: student.groupName,
	admin: student.admin
	});
	return {
	id: group.id,
	department: group.department,
	name: group.name,
	members: group.members,
	comments: group.comments,
	proposals: group.proposals,
	dueDate: group.dueDate,
	acadYear: group.acadYear,
	presentation: group.presentation,
	weeklyMeetLog: group.weeklyMeetLog,
	report: group.report,
	implementation: group.implementation,
	guide: group.guide,
	addtionalDocuments: group.addtionalDocuments
	};
}

async function forgetPassword(email) {
	user = await User.findOne({ email: email });
	if (user == null) return "A user with that email doesn't exist";
	else {
	let token = crypto.randomBytes(16).toString("hex");
	user.resetPasswordToken = token;
	user.resetPasswordExpires = new Date();
	user.save(function (err) {
		if (err) console.log(err);
	});
	data = {
		email: user.email,
		link: process.env.HOST + "/resetPassword/" + token
	};
	if (process.env.NODE_ENV == "production") sendmail(data, "forgetPassword");
	else console.log("data");
	return "Details to reset password has been mailed to this email please check your inbox";
	}
}
async function resetPassword(token, newPassword) {
	user = await User.findOne({ resetPasswordToken: token });
	now = new Date();
	if (now - user.resetPasswordExpires > 10 * 60 * 1000) return "no";
	const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
	user.password = hash;
	user.resetPasswordToken = null;
	user.resetPasswordExpires = null;
	await user.save();
	return "yes";
}

async function archive(admin_id) {
	grps = await Group.find({ admin: admin_id });
	if (grps.length == 0) return;
	acadYear = grps[0].acadYear;
	arc = await Archive.findOne({ admin: admin_id });
	if (arc == null) arc = Archive({ admin: admin_id });
	let arc_grps = [];
	grps.forEach(function (grp) {
	members = [];
	for (let j = 0; j < grp.members.length; ++j)
		members.push({
		name: grp.members[j].name,
		email: grp.members[j].email,
		rollno: grp.members[j].rollno
		});
	proposals = [];
	for (let j = 0; j < grp.proposals.length; ++j)
		proposals.push({
		title: grp.proposals[j].title,
		specialization: grp.proposals[j].specialization,
		details: grp.proposals[j].details,
		agency: grp.proposals[j].agency,
		method: grp.proposals[j].method,
		result: grp.proposals[j].result,
		requirements: grp.proposals[j].requirements,
		attachPrints: grp.proposals[j].attachPrints,
		approval: {
			admin: grp.proposals[j].approval.admin,
			hod: grp.proposals[j].approval.hod
		},
		applied: grp.proposals[j].applied
		});
	guide = {
		name: grp.guide.name,
		email: grp.guide.email
	};
	arc_grps.push({
		name: grp.name,
		members: members,
		proposals: proposals,
		guide: guide
	});
	});
	let data1 = { acadYear: acadYear, groups: arc_grps };
	arc.data.push(data1);
	arc.save(function (err) {
	if (err) console.log(err);
	});
}
async function getArchive(admin_id) {
	arc = await Archive.findOne({ admin: admin_id });
	if(arc) return arc.data;
	else return [];
}

async function deleteAllUsers(admin_id) {
	User.deleteMany({ admin: admin_id }, function (err) {
	if (err) console.log(err);
	console.log("deleted all users");
	});
	// Group.find({ admin: admin_id }, function (err, data) {
	//   if (err) console.log(err);
	//   data.forEach(function (grp) {
	//     grp.proposals.forEach(function (proposal) {
	//       mediaServer.deleteFile(proposal.attachPrints)
	//       fs.unlink(path.join(".", "proposal", proposal.attachPrints), function (
	//         err
	//       ) {
	//         if (err) console.log(err);
	//         console.log("deleted proposals");
	//       });
	//     });
	//   });
	// });
	Group.deleteMany({ admin: admin_id }, function (err) {
	if (err) console.log(err);
	});
}
async function excel(admin_id) {
	data = await Group.find({ admin: admin_id });
	if (!data) return;
	workbook = new ExcelJS.Workbook();
	worksheet = workbook.addWorksheet("Project List");
	// {
	//  pageSetup:{
	//    horizontalCentered:true,
	//    verticalCentered:true,
	//    showGridLines:true
	//  }
	// }

	worksheet.columns = [
	{
		header: "Group no",
		key: "gno",
		width: 10,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Name of student",
		key: "name",
		width: 20,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Title",
		key: "title",
		width: 40,
		rowSpan: 2,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Guide",
		key: "guide",
		width: 20,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Innovative",
		key : "Innovative",
		width : 15 ,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header:"Research Oriented",
		key : "Research Oriented", 
		width : 20 ,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header:"NGO Based",
		key : "NGO Based", 
		width : 15 ,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header:"Social Need",
		key : "Social Need", 
		width : 15 ,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header:"Education Based",
		key : "Education Based", 
		width : 20 ,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header:"Real Time",
		key : "Real Time", 
		width : 15 ,
		style: { font: { name: "Times New Roman" } }
	}
	];
	sheet_data_rows = [];
	merge_cells = [];
	count = 2; // imp change kar lena 
	// heading_line_1 = {
	//   "name":"Department of Computer Engineering"
	// }
	// heading_line_2 = {
	//   "name":"Academic Year "+data[0].acadYear
	// }
	// heading_line_3 = {
	//   "name":"B.E. Computer Project Details with Categories"
	// }
	// sheet_data_rows.push(heading_line_1)
	// sheet_data_rows.push(heading_line_2)
	// sheet_data_rows.push(heading_line_3)

	total_category_heading = {
		"Innovative":"Innovative",
		"Research Oriented":"Research Oriented",
		"NGO Based":"NGO Based",
		"Social Need":"Social Need",
		"Education Based":"Education Based",
		"Real Time": "Real Time" 
	}
	total_category = {
	"guide" : "Total Count",
	"Innovative":0,
	"Research Oriented":0,
	"NGO Based":0,
	"Social Need":0,
	"Education Based":0,
	"Real Time":0
	}
	data.forEach(function (grp) {
	valid = false;
	index = null;
	for (let i = 0; i < grp.proposals.length; ++i) {
		if (grp.proposals[i].approval.hod && grp.proposals[i].approval.admin) {
		valid = true;
		index = i;
		break;
		}
	}
	if (valid) {
		grp.members.forEach(function (member) {
		row_one = {
			gno: grp.name.replace("group","") ,
			name: member.name,
			title: grp.proposals[index].title,
			guide: grp.guide.name
		}
		row_one[grp.proposals[index].category.trim()] = 1
		sheet_data_rows.push(row_one);
		});
		total_category[grp.proposals[index].category.trim() ]++

		merge_cells.push(`A${count}:A${count + grp.members.length - 1}`);
		merge_cells.push(`C${count}:C${count + grp.members.length - 1}`);
		merge_cells.push(`D${count}:D${count + grp.members.length - 1}`);
		merge_cells.push(`E${count}:E${count + grp.members.length - 1}`);
		merge_cells.push(`F${count}:F${count + grp.members.length - 1}`);
		merge_cells.push(`G${count}:G${count + grp.members.length - 1}`);
		merge_cells.push(`H${count}:H${count + grp.members.length - 1}`);
		merge_cells.push(`I${count}:I${count + grp.members.length - 1}`);
		merge_cells.push(`J${count}:J${count + grp.members.length - 1}`);

		count += grp.members.length;
	}
	});

	sheet_data_rows.push(total_category_heading)
	sheet_data_rows.push(total_category)
	sheet_data_rows.forEach(function (row) {
	worksheet.addRow(row);
	});
	worksheet.getRow(1).eachCell(function (cell) {
	cell.font = { name: "Times New Roman", bold: true };
	});
	worksheet.getRow(count).eachCell(function (cell) {
	cell.font = { name: "Times New Roman", bold: true };
	});
	worksheet.getRow(count+1).eachCell(function (cell) {
	cell.font = { name: "Times New Roman", bold: true };
	});

	merge_cells.forEach(function (cell) {
	worksheet.mergeCells(cell);
	});
	worksheet.eachRow(function (row) {
	row.eachCell(function (cell) {
		cell.alignment = { vertical: "middle", horizontal: "center" };
		cell.border = {
		top: { style: "thin" },
		left: { style: "thin" },
		bottom: { style: "thin" },
		right: { style: "thin" }
		};
	});
	});
	// await workbook.xlsx.writeFile('project_list.xlsx')
	return workbook;
}

async function submissionList(admin_id) {
	grps = await Group.find({ admin: admin_id });
	if (!grps) return;
	students = [];
	grps.forEach(function (grp) {

	members_hash = {}
	grp.members.forEach( (mem)=>{
		members_hash[mem.rollno] = {
		rollno: mem.rollno,
		name: mem.name,
		report: 0,
		presentation: 0,
		implementation: 0,
		attendance: Math.round((grp.weeklyMeetLog.length / 13) * 10),
		total: 0
		}
	} )

	grp.report.forEach( (rep)=>{
		members_hash[rep.rollno ].report = rep.orgAndWriting + rep.enggTheoryAnaly + rep.biblogrpahy + rep.spellAndGrammar + rep.diagrams
	} )
	grp.implementation.forEach( (impl)=>{
		members_hash[impl.rollno].implementation = impl.probStatment + impl.concept + impl.innovation + impl.teamwork + impl.pmf
	} )

	// console.log( members_hash)

	// report =
	//   grp.report.orgAndWriting +
	//   grp.report.enggTheoryAnaly +
	//   grp.report.biblogrpahy +
	//   grp.report.spellAndGrammar +
	//   grp.report.diagrams;

	// implementation =
	//   grp.implementation.probStatment +
	//   grp.implementation.concept +
	//   grp.implementation.innovation +
	//   grp.implementation.teamwork +
	//   grp.implementation.pmf;

	// attendance = Math.round((grp.weeklyMeetLog.length / 13) * 10);

	grp.presentation.forEach(function (pre) {
		pre.marks.forEach( (p)=>{
		members_hash[p.rollno].presentation += p.orgMarks + p.subKnowMarks + p.EODMarks + p.timeMarks;
		} )
		
	});

	Object.keys(members_hash).forEach( (key)=>{
		members_hash[key].total = members_hash[key].report + members_hash[key].implementation + members_hash[key].presentation + members_hash[key].attendance
		students.push(members_hash[key] );
	} )

	// total = report + presentation + implementation + attendance;
	// grp.members.forEach(function (m) {
	//   s = {
	//     rollno: m.rollno,
	//     name: m.name,
	//     report: report,
	//     presentation: presentation,
	//     implementation: implementation,
	//     attendance: attendance,
	//     total: total
	//   };
	// });
	});
	students.sort(function (a, b) {
	return a.rollno > b.rollno ? 1 : -1;
	});
	// console.log(students)
	// students.forEach( (s)=>{
	//   console.log(s)
	// } )
	// return null;

	workbook = new ExcelJS.Workbook();
	worksheet = workbook.addWorksheet("Project List");
	worksheet.columns = [
	{
		header: "Roll No",
		key: "rollno",
		width: 10,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Name of student",
		key: "name",
		width: 25,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Report",
		key: "report",
		width: 10,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Presentation",
		key: "presentation",
		width: 15,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Implementation",
		key: "implementation",
		width: 15,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Attendance",
		key: "attendance",
		width: 15,
		style: { font: { name: "Times New Roman" } }
	},
	{
		header: "Total",
		key: "total",
		width: 10,
		style: { font: { name: "Times New Roman" } }
	}
	];
	students.forEach(s => {
	worksheet.addRow(s);
	});
	worksheet.getRow(1).eachCell(function (cell) {
	cell.font = { name: "Times New Roman", bold: true };
	});
	worksheet.eachRow(function (row) {
	row.eachCell(function (cell) {
		cell.alignment = { vertical: "middle", horizontal: "center" };
		cell.border = {
		top: { style: "thin" },
		left: { style: "thin" },
		bottom: { style: "thin" },
		right: { style: "thin" }
		};
	});
	});
	// await workbook.xlsx.writeFile("Submission List.xlsx");
	return workbook;
}

async function deletearchive(admin_id, archive_id) {
	arc = await Archive.findOne({ admin: admin_id });
	index = null;
	for (let i = 0; i < arc.data.length; ++i) {
	if (arc.data[i].id == archive_id) {
		index = i;
		break;
	}
	}
	if (index != null) {
	arc.data.splice(index, 1);
	arc.save(function (err) {
		if (err) console.log(err);
	});
	}
}

async function weeklyMeetLog(gid, date, remark) {
	grp = await Group.findById(gid);
	grp.weeklyMeetLog.push({ scheduled_date: date, remark: remark });
	await grp.save();
}

async function deleteWeeklyMeetLog(gid, wid) {
	grp = await Group.findById(gid);
	index = null;
	for (let i = 0; i < grp.weeklyMeetLog.length; ++i) {
	if (grp.weeklyMeetLog[i].id == wid) {
		index = i;
		break;
	}
	}
	if (index != null) {
	grp.weeklyMeetLog.splice(index, 1);
	grp.save(function (err) {
		if (err) console.log(err);
	});
	}
}

async function reportMarks(gid, report_marks) {
	grp = await Group.findById(gid);
	grp.report = report_marks;
	// grp.report.orgAndWriting = orgAndWriting;
	// grp.report.enggTheoryAnaly = enggTheoryAnaly;
	// grp.report.biblogrpahy = biblogrpahy;
	// grp.report.spellAndGrammar = spellAndGrammar;
	// grp.report.diagrams = diagrams;
	// grp.report.filled = true;
	await grp.save();
}

// async function deleteReportMarks(gid) {
//   grp = await Group.findById(gid);
//   grp.report.orgAndWriting = 0;
//   grp.report.enggTheoryAnaly = 0;
//   grp.report.biblogrpahy = 0;
//   grp.report.spellAndGrammar = 0;
//   grp.report.diagrams = 0;
//   grp.report.filled = false;
//   await grp.save();
// }

async function implementationMarks(gid, implementationMarks) {
	grp = await Group.findById(gid);
	grp.implementation = implementationMarks;
	// grp.implementation.probStatment = probStatment;
	// grp.implementation.concept = concept;
	// grp.implementation.innovation = innovation;
	// grp.implementation.teamwork = teamwork;
	// grp.implementation.pmf = pmf;
	// grp.implementation.filled = true;
	await grp.save();
}

// async function deleteImplementationMarks(gid) {
// grp = await Group.findById(gid);
// grp.implementation.probStatment = 0;
// grp.implementation.concept = 0;
// grp.implementation.innovation = 0;
// grp.implementation.teamwork = 0;
// grp.implementation.pmf = 0;
// grp.implementation.filled = false;
// await grp.save();
// }

async function viewGroupProposals(gid) {
	grp = await Group.findById(gid);
	if (!grp) return null;
	let grdData = {
	name: grp.name,
	members: grp.members,
	proposals: grp.proposals
	};
	return grdData;
}

async function uploadAddtionalDocument(doc, body) {
	grp = await Group.findById(body.gid.trim());
	url = await mediaServer.uploadFile(doc);
	grp.addtionalDocuments.push({
		docName: body.docName.trim(),
		desc: body.desc.trim(),
		doclink: url
	});
	await grp.save();
	updateArchive( body.gid.trim() )
}

async function deleteuploadedDocument(gid, aid) {
	grp = await Group.findById(gid.trim());
	index = null;
	for (let i = 0; i < grp.addtionalDocuments.length; ++i) {
	if (grp.addtionalDocuments[i].id == aid) {
		index = i;
		break;
	}
	}
	if (index != null) {
	mediaServer.deleteFile(grp.addtionalDocuments[index].doclink);
	grp.addtionalDocuments.splice(index, 1);
	await grp.save();
	}
}


async function updateArchive(group_id){
	grp = await Group.findById(group_id.trim()) 
	index = null 
	for (let i = 0 ;  i< grp.proposals.length ; ++i ) {
		if(grp.proposals[i].approval.hod && grp.proposals[i].approval.admin)
			index = i 
	}
	if(index==null) return

	arch = await Archive.findOne({ admin: grp.admin });
	if (!arch) arch = Archive({admin:grp.admin , data:[] })
	
	d_index  =  null 
	for(let i = 0  ; i < arch.data.length ; ++i )
	{
		if(arch.data[i].id == grp.archiveID ){
			d_index = i 
			break
		}
	}
	if(d_index==null) d_index = arch.data.length


	proposal = grp.proposals[index]
	members = []
	grp.members.forEach( (mem)=>{ members.push({
		name:mem.name,
		email:mem.email
	})})
	addtionalDocuments = []
	grp.addtionalDocuments.forEach( (doc)=>{
		addtionalDocuments.push({
		docName: doc.docName ,
		desc: doc.desc ,
		doclink: doc.doclink 
		})
	} )

	arch.data[d_index] = {
		acadYear : grp.acadYear,
		members: members,
		project : {
			title: proposal.title ,
			specialization: proposal.specialization ,
			details: proposal.details ,
			agency: proposal.agency  ,
			method: proposal.method ,
			result: proposal.result ,
			requirements: proposal.requirements  ,
			typeOfProject:proposal.typeOfProject  ,
			category: proposal.category ,
			attachPrints: proposal.attachPrints ,
		},
		addtionalDocuments: addtionalDocuments ,
		guide : {
			name : grp.guide.name ,
			email : grp.guide.email ,
		},
	}
	await arch.save()
	grp.archiveID = arch.data[d_index].id
	grp.save()
}

async function genExcel(admin_id,f_acadYear,f_typeOfProject,f_category){
	arch = await Archive.findOne({ admin: admin_id })
	if(!arch) return null
	data =  arch.data.filter( (arc)=>{
		if (f_acadYear && arc.acadYear != f_acadYear.trim()) 
			return false
		if (f_category && arc.project.category != f_category.trim())
			return false
		if (f_typeOfProject && arc.project.typeOfProject != f_typeOfProject.trim())
			return false
		return true
	} )
	
	workbook = new ExcelJS.Workbook();
	worksheet = workbook.addWorksheet("Project List");
	worksheet.columns = [
		{
			header: "Sr. No.",
			key: "srno",
			width: 10,
			style: { font: { name: "Times New Roman" } }
		},
		{
			header : "Title",
			key : "title",
			width : 40 , 
			style: { font: {name : "Times New Roman" } }
		},
		{
			header : "Members",
			key : "name",
			width : 25 , 
			style: { font: {name : "Times New Roman" } }
		},
		{
			header : "Guide",
			key : "guide",
			width : 20 , 
			style: { font: {name : "Times New Roman" } }
		},
		{
			header : "Category",
			key : "category",
			width : 20 , 
			style: { font: {name : "Times New Roman" } }
		},
		{
			header : "Type",
			key : "typeOfProject",
			width : 10 , 
			style: { font: {name : "Times New Roman" } }
		}
	]

	rows = []
	merge_cells = []
	count = 2
	srno = 1
	data.forEach( (grp)=>{
		grp.members.forEach( (mem)=> {
			rows.push({
				srno : srno,
				title : grp.project.title,
				name : mem.name,
				guide : grp.guide.name ,
				category : grp.project.category ,
				typeOfProject : grp.project.typeOfProject
			})
		} )
		merge_cells.push(`A${count}:A${count + grp.members.length - 1}`);
		merge_cells.push(`B${count}:B${count + grp.members.length - 1}`);
		merge_cells.push(`D${count}:D${count + grp.members.length - 1}`);
		merge_cells.push(`E${count}:E${count + grp.members.length - 1}`);
		merge_cells.push(`F${count}:F${count + grp.members.length - 1}`);

		count += grp.members.length
		srno++
	} )
	rows.forEach( (row)=>{
		worksheet.addRow(row)
	} )

	merge_cells.forEach( (cell)=>{
		worksheet.mergeCells(cell);			
	} )

	worksheet.getRow(1).eachCell(function (cell) {
		cell.font = { name: "Times New Roman", bold: true };
	});

	worksheet.eachRow(function (row) {
		row.eachCell(function (cell) {
			cell.alignment = { vertical: "middle", horizontal: "center" };
			cell.border = {
			top: { style: "thin" },
			left: { style: "thin" },
			bottom: { style: "thin" },
			right: { style: "thin" }
			};
		});
	});	

	// await workbook.xlsx.writeFile('filtered_list.xlsx')
	return workbook

}



passport.use(
	new localStrategy(
	{ usernameField: "email" },
	function (email, password, done) {
		User.findOne({ email: email }, function (err, user) {
		if (err) return done(err);
		if (user == null)
			return done(null, false, { message: "No User With That Email" });
		bcrypt.compare(password, user.password, function (err, result) {
			if (result)
			return done(null, user, { message: "Successfully Logged In" });
			else return done(null, false, { message: "Invalid password" });
		});
		});
	}
	)
);


// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) return done(err);
//     else return done(null, user);
//   });
// });

module.exports = {
	addToDatabase: addToDatabase,
	passport: passport,
	changePassword: changePassword,
	generateGroups: generateGroups,
	getStudents: getStudents,
	addProposals: addProposals,
	addComment: addComment,
	getGroup: getGroup,
	approve: approve,
	addMemberToGroup: addMemberToGroup,
	updateDueDate: updateDueDate,
	addGuide: addGuide,
	getGuide: getGuide,
	getGuideGroups: getGuideGroups,
	presentation: presentation,
	deleteguide: deleteguide,
	deletehod: deletehod,
	updateMarks: updateMarks,
	deletePresentation: deletePresentation,
	forgetPassword: forgetPassword,
	resetPassword: resetPassword,
	deleteStudent: deleteStudent,
	deleteProposal: deleteProposal,
	archive: archive,
	getArchive: getArchive,
	deleteAllUsers: deleteAllUsers,
	excel: excel,
	// deletearchive: deletearchive,
	weeklyMeetLog: weeklyMeetLog,
	deleteWeeklyMeetLog: deleteWeeklyMeetLog,
	reportMarks: reportMarks,
	// deleteReportMarks: deleteReportMarks,
	implementationMarks: implementationMarks,
	// deleteImplementationMarks: deleteImplementationMarks,
	submissionList: submissionList,
	viewGroupProposals: viewGroupProposals,
	uploadAddtionalDocument: uploadAddtionalDocument,
	deleteuploadedDocument: deleteuploadedDocument,
	genExcel:genExcel
};
