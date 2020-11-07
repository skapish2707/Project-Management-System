var mongoose = require("mongoose");
var User = require("../models/User");
var Group = require("../models/Group");
var bcrypt = require("bcrypt");
var fs = require("fs");
var path = require('path');
var crypto = require('crypto');
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var sendmail = require('./sendmail');

mongoose.connect(process.env.uri,{
	useNewUrlParser : true,
	useUnifiedTopology: true,
    useFindAndModify: false
	},function(err){
	if (err){
		console.log(err);
	}else{
		console.log("Connected to database");
    // Group.find({},function(err,data){
    //   data.forEach(function(grp){
    //     grp.presentation = []
    //     grp.save(function(err){
    //       if(err) throw err;
    //     })
    //   })
    // })
    // User.findOne({email:"new@guide.com"},function(err,user){
    //   if (err) throw err;
    //   console.log(user);
    //   // getGuideGroups(user);      
    // })
    // Group.find({},function(err,data){
    //   data.forEach(function(grp){
    //   // for (var i = 0; i< grp.presentation.length ; i++) {
    //   //   grp.presentation[i].marks = null;
    //   //   }  
    //   // grp.save(function(err){
    //   //   if (err) throw err;
    //   // })
    //   console.log(grp.presentation)
    //   })
    // })
    // Group.findById("5f7574b159bffd36583e41fd",function(err,grp){
    //   if (err) throw err;
    //   console.log(grp.presentation)
    //   console.log(grp.presentation[0]._id)
    // })

    //DELETE  STUDENT GROUPS HOD PIC IG by admin email
        // User.findOne({email:"newtest@admin.com"},function(err,admin){          
        //   if(err) throw err ;
        //   User.deleteMany({admin:admin.id},function(err){
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

async function generateGroups(admin,dueDate,acadYear,users) {
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let groupName = user[3].toLowerCase().trim().replace(/ /g, "")
      let group = await Group.findOne({ name: groupName,admin:admin.id });
      if (!group) {
        group = await Group({
          name: groupName,
          department : user.department,
          members: [],
          admin: admin.id,
          dueDate:dueDate,
          acadYear:acadYear,
          guide : {
            name :null,
            email : null
          }
        });
      }
      group.members.push({
        name : user[0],
        email : user[2],
        rollno : user[1]
      });
      await group.save();
    }
}

async function addToDatabase(admin,name,rollno,email, department, type, groupName = null) {
    if(await User.findOne({email:email}))
    {
      console.log("a user with that email already exist")
      return;
    } 
    password = makePassword(8);
    if (admin)
      data = {admin_name:"by "+admin.name,email:email,password:password,name:name}
    else 
      data = {admin_name:"",email:email,password:password,name:name}
    if(process.env.NODE_ENV == 'production')
      sendmail(data,"registeration");
    else
      saveLocallyForDevelopment(email, password);
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
    console.log(user);
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
                guide : groups[i].guide,
                presentation:groups[i].presentation
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
      "id":guides[i].id,
      "name" :guides[i].name,
      "email" : guides[i].email,
      "type":"guide"
    })
  }
  hod = await User.findOne({admin:admin.id,type:"hod"});
  if(hod)
  {
    custom_guides.push({
      id:hod.id,
      name:hod.name,
      email :hod.email ,
      type : "hod"
    })
  }
  return custom_guides
}
async function getGuideGroups(user){
  groups =  await Group.find({admin:user.admin,guide:{name:user.name,email:user.email}})
  list_groups = []
  for (let i=0; i<groups.length ; ++i){
    // if(groups[i].guide.email && groups[i].guide.email.trim() == user.email.trim())
      list_groups.push({
        id : groups[i].id,
        department : groups[i].department,
        name : groups[i].name,
        members : groups[i].members,
        proposals :groups[i].proposals,
        dueDate:groups[i].dueDate,
        acadYear:groups[i].acadYear
      })
  }
  console.log(list_groups)
  return list_groups
}

async function presentation(gid,datetime){
  grp = await Group.findById(gid);
  grp.presentation.push({
    scheduled_date:datetime
  }) 
  await grp.save()
}
async function updateMarks(gid,pid,marks){
  grp = await Group.findById(gid)
  for(let i = 0 ;i < grp.presentation.length ; ++i){
    if(grp.presentation[i]._id == pid){
      grp.presentation[i].marks = marks
      break
    }
  }
  await grp.save()
}
async function deletePresentation(gid,pid){
  grp = await Group.findById(gid)
  let index = null
  for(let i = 0 ;i < grp.presentation.length ; ++i){
    if(grp.presentation[i]._id == pid){
      index = i
      break
    }
  }
  grp.presentation.splice(index,1)
  await grp.save()
}
async function deleteguide(id,guide){
  await User.findByIdAndDelete(id);
  console.log(`DELETED GUIDE name :${guide.name} email ${guide.email}`);
  Group.find({guide:guide},function(err,data){
    if(err) throw err ;
    data.forEach(function(grp){
      grp.guide = {name:null,email:null}
      grp.save(function(err){
        if(err) throw err;
      })
    })
  })
}

async function deletehod(id){
  await User.findByIdAndDelete(id);
}
async function deleteStudent(gid,email){
  await User.findOneAndDelete({email:email})
  grp =  await Group.findById(gid)
  let index = null
  for(let i = 0 ;i < grp.members.length ; ++i){
    if(grp.members[i].email== email){
      index = i
      break
    }
  }
  grp.members.splice(index,1)
  grp.save(function(err){
    if (err) throw err;
  })
}

async function deleteProposal(gid){
  grp =  await Group.findById(gid)
  grp.proposals.forEach(function(proposal){
    fs.unlink(path.join('.','proposal',proposal.attachPrints),function(err){
      if (err) console.log(err) 
      console.log("deleted proposals")
    })
  })
  grp.proposals = []
  await grp.save()
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

async function forgetPassword(email){
  user = await User.findOne({email:email})
  if(user == null)
    return "A user with that email doesn't exist"
  else{
    let token = crypto.randomBytes(16).toString('hex')
    user.resetPasswordToken =  token
    user.resetPasswordExpires = new Date()
    user.save(function(err){
      if (err) throw err;
    })
    data = {email:user.email,link:process.env.HOST+"/resetPassword/"+token}
    if(process.env.NODE_ENV == "production")
      sendmail(data,"forgetPassword");
    else
      console.log(data)
    return "Details to reset password has been mailed to this email please check your inbox"
  }
}
async function resetPassword(token,newPassword){
  user = await  User.findOne({resetPasswordToken:token})
  now = new Date()
  if(now-user.resetPasswordExpires>10*60*1000)
    return "no"
  const hash =  bcrypt.hashSync(newPassword,bcrypt.genSaltSync(10));
  user.password = hash
  user.resetPasswordToken=null
  user.resetPasswordExpires=null
  await user.save()
  return "yes"
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
  getGuideGroups : getGuideGroups,
  presentation : presentation,
  deleteguide:deleteguide,
  deletehod:deletehod,
  updateMarks:updateMarks,
  deletePresentation:deletePresentation,
  forgetPassword:forgetPassword,
  resetPassword:resetPassword,
  deleteStudent:deleteStudent,
  deleteProposal:deleteProposal,
};
