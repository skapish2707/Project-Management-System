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
	useUnifiedTopology: true
	},function(err){
	if (err){
		console.log(err);
	}else{
		console.log("Connected to database");
		// CUSTOM CHANGE TO DATABASE HERE \

		// User.deleteMany({type:'student'},function(err){if (err) throw err; else console.log('deleted all students') });
		// User.deleteMany({type:'ig'},function(err){if (err) throw err; else console.log('deleted IG') });
		// User.deleteMany({type:'pic'},function(err){if (err) throw err; else console.log('deleted PIC') });
		// User.deleteMany({type:'hod'},function(err){if (err) throw err; else console.log('deleted HOD') });
		// Group.deleteMany({},function(err){if (err) throw err; else console.log('deleted Groups') });
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

function generateGroups(admin) {
  User.find({ type: "student", admin: admin.id }, async function (err, users) {
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let group = await Group.findOne({ name: user.groupName });
      if (!group) {
        group = await Group({
          name: user.groupName,
          members: [],
          admin: admin.id
        });
      }
      group.members.push(user.email);
      await group.save();
    }
  });
}

async function addToDatabase(admin, email, department, type, groupName = null) {
  password = makePassword(8);
  saveLocallyForDevelopment(email, password);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  var user = User();
  user.email = email;
  user.password = hash;
  user.department = department;
  user.type = type;
  if (admin) user.admin = admin.id;
  if (groupName) {
    var name = groupName.toLowerCase().trim().replace(/ /g, "");
    user.groupName = name;
  }
  await user.save();
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
                name : groups[i].name,
                members : groups[i].members,
                comments : groups[i].comments,
                proposals :groups[i].proposals
            })
        }
	}
	return items
}

function addProposals(student,proposals){
    Group.findOne({members:student.id},function(err,group){
        if (err) throw err;
        proposals = JSON.parse(proposals);
        group.proposals = []
        for(let i = 0 ; i < proposals.length ; i++){
            group.proposals.push(proposals[i]);
        }
        group.save(function(err){
            if (err) throw err;
        })
    });
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
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) return done(err);
    else return done(null, user);
  });
});

module.exports = {
  addToDatabase: addToDatabase,
  passport: passport,
  changePassword: changePassword,
  generateGroups: generateGroups,
  getStudents : getStudents,
  addProposals : addProposals,
};
