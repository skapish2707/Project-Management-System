var mongoose = require("mongoose");
var User = require("../models/User");
var Group = require("../models/Group");
var bcrypt = require("bcrypt");
var fs = require("fs");
require("dotenv").config();
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

mongoose.connect(process.env.uri,{
	useNewUrlParser : true,
	useUnifiedTopology: true,
    useFindAndModify: false
	},function(err){
	if (err){
		console.log(err);
	}else{
		console.log("Connected to database");
    //DELETE  STUDENT GROUPS HOD PIC IG by admin email
        // User.findOne({email:"Baburao@admin.com"},function(err,admin){          
        //   if(err) throw err ;
        //   User.deleteMany({admin:admin.id,type:"guide"},function(err){
        //       if (err) throw err
        //           console.log('deleted all user created by ', admin.email)
        //   })
        //   Group.deleteMany({admin:admin.id},function(err){
        //       if (err) throw err
        //           console.log('deleted all groups created by', admin.email)
        //   })  
        // })
    //DELETE PROPOSAL BY EMAIL OF ANY MEMBER
      // Group.findOneAndUpdate({members.email:"trialNew1@gmail.com"},{proposals:[]})  
	}
});


function makePassword(length) {
  var result = "";
  var characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
    if (err) throw err;
  });
}

async function generateGroups(admin,dueDate,acadYear) {
    users = await User.find({ type: "student", admin: admin.id })
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let group = await Group.findOne({ name: user.groupName,admin:admin.id });
      if (!group) {
        group = await Group({
          name: user.groupName,
          department : user.department,
          members: [],
          admin: admin.id,
          dueDate:dueDate,
          acadYear:acadYear
        });
      }
      group.members.push({
        name : user.name ,
        email : user.email ,
        rollno : user.rollno 
      });
      await group.save();
    }
}

async function addToDatabase(admin,name,rollno,email, department, type, groupName = null) {
    password = makePassword(8);
    saveLocallyForDevelopment(email, password);//sendMailInProduction();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    var user = User();
    user.email = email;
    user.password = hash;
    user.department = department;
    user.type = type;
    if(rollno) user.rollno = rollno;
    if(name) user.name = name;
    if (admin) user.admin = admin.id;
    if (groupName) {
    var name = groupName.toLowerCase().trim().replace(/ /g, "");
    user.groupName = name;
    }
    await user.save();
    return user;
}
async function addMemberToGroup(groupId,student){
  member = {
    name : student.name,
    email : student.email,
    rollno : student.rollno
  }
  group = await Group.findById(groupId)
  group.members.push(member) ;
  await group.save();
}

async function updateDueDate(admin,dueDate){
  Group.find({admin:admin.id},function(err,groups){
    if (err) throw err ;
    groups.forEach(function(group){
      group.dueDate = dueDate;
      group.save();
    })    
  })
}

async function getStudents(user,by){
	let admin = null;
	if (user.type == 'admin') admin = user.id;
	else admin = user.admin;
	let items = []
	if (by=="name"){
		students = await User.find({type:'student',admin:admin})
		for (let i = 0 ; i < students.length ;i ++){
			let student  = students[i];
			items.push({'email':student.email,'groupName':student.groupName,'department':student.department});
		}

	}
	else if (by == "group"){
		groups  = await Group.find({admin:admin})
        for (let i = 0 ;i < groups.length ; i++){
            items.push({
                id : groups[i].id,
                name : groups[i].name,
                members : groups[i].members,
                comments : groups[i].comments,
                proposals :groups[i].proposals,
                dueDate : groups[i].dueDate,
                acadYear : groups[i].acadYear,
                guide : groups[i].guide
            })
        }
	}
	return items
}

async function addProposals(student,proposals){
  await Group.findOneAndUpdate({admin:student.admin,name:student.groupName},{proposals:proposals});
}

async function addComment(staff,groupId,msg){
    group =  await Group.findById(groupId.trim());
    group.comments.push({
        author : staff.email,
        text : msg.trim(),
    });
    await group.save();
}

async function addGuide(email,name,groupId){
  await Group.findByIdAndUpdate(groupId,{guide:{name : name.trim() ,email : email.trim()}});
}

async function getGuide(admin){
  guides = await User.find({admin:admin.id,type:"guide"});
  let custom_guides = []
  for (let i = 0 ; i < guides.length; i++) {
    custom_guides.push({
      "name" :guides[i].name,
      "email" : guides[i].email
    })
  }
  return custom_guides
}

async function approve(groupId,proposalId,staff){
    group =  await Group.findById(groupId.trim());
    for (let i = 0 ; i < group.proposals.length ; i++){
      if (group.proposals[i].id == proposalId.trim()){
        if (staff == 'admin'){
          group.proposals[i].approval.admin = true;
        }else if(staff == 'hod'){
          group.proposals[i].approval.hod = true;
        }
      }
      else {
        if (staff == 'admin'){
          group.proposals[i].approval.admin = false;
        }else if(staff == 'hod'){
          group.proposals[i].approval.hod = false;
        }
      }
    }
    await group.save();
}

async function getGroup(student){
    group = await Group.findOne({name:student.groupName, admin:student.admin});
    return {
        id : group.id,
        department : group.department,
        name : group.name,
        members : group.members,
        comments : group.comments,
        proposals :group.proposals,
        dueDate:group.dueDate,
        acadYear:group.acadYear
    }
}


passport.use(
  new localStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    User.findOne({ email: email }, function (err, user) {
      if (err) return done(err);
      if (user == null)
        return done(null, false, { message: "No User With That Email" });
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) return done(null, user, { message: "Successfully Logged In" });
        else return done(null, false, { message: "Invalid password" });
      });
    });
  })
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
  getStudents : getStudents,
  addProposals : addProposals,
  addComment : addComment,
  getGroup : getGroup,
  approve : approve,
  addMemberToGroup : addMemberToGroup,
  updateDueDate : updateDueDate,
  addGuide : addGuide,
  getGuide : getGuide,
};
