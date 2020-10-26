require('dotenv').config();
var express = require('express')
var router = express.Router();
var dbm = require('./Controllers/dbm');
var xlsx = require('node-xlsx');
var passport = dbm.passport;
var jwt = require('jsonwebtoken');


function authenticateToken(req,res,next){
	const authHeader = req.headers['authorization'];
	const token =authHeader && authHeader.split(' ')[1];
	if (token==null) return res.sendStatus(401);
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,function(err,user){
		if(err) return res.sendStatus(403);
		req.user = user;
		next();
	})
}

router.get('/user',authenticateToken,function(req,res){
	if (!req.user) return res.status(404).send(null);
	if (req.user) return res.json({
		email : req.user.email,
		type : req.user.type,
		department : req.user.department,
		groupName : req.user.groupName,
		name : req.user.name,
		rollno : req.user.rollno,
	});
});
router.post('/login',passport.authenticate('local',{session: false}),function(req,res){
	if (!req.user) return res.status(404).send(null);

	const user = {id:req.user.id,email : req.user.email,type : req.user.type,department : req.user.department,groupName : req.user.groupName,name : req.user.name,rollno : req.user.rollno,admin:req.user.admin}
	const access_token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '5m'});
	return res.json({
		access_token:access_token,
		// email : req.user.email,
		 type : req.user.type
		// department : req.user.department,
		// groupName : req.user.groupName,
		// name : req.user.name,
		// rollno : req.user.rollno,
	});
});
router.get('/logout', function(req, res){
	if (!req.user) return res.status(404).send(null);
	req.logout();
	return res.status(200).send("logout Out Successfully");
});
router.post('/changePassword',function(req,res){
	if (!req.isAuthenticated()) return res.status(404).send();

	// newPassword , confirmPassword
	if (req.body.newPassword !== req.body.confirmPassword)
		return res.status(422).send("Two Fields Doesn't match");

	let result = dbm.changePassword(req.user,req.body.newPassword);
	if (result) {
		req.logout();
		return res.status(200).send("Your password was changed please login again");
	}
	else 
		return res.status(500).send();			
});



router.get('/group',authenticateToken,async function(req,res){
	if(!req.user) return res.status(404).send();
	if(req.user.type != 'student') return res.status(404).send();
	try {
		group =  await dbm.getGroup(req.user);
		return res.status(200).send(group);
	}catch{
		return res.status(500).send();
	}

});

router.post('/yami',function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type!="yami") return res.status(404).send();
	
	//email : email
	//department : department
	// name : name
	name  = req.body.name;
	email = req.body.email;
	department = req.body.department;
	dbm.addToDatabase(null,name,null,email,department,"admin");
	res.status(200).send("OK") ;
});


router.post('/admin',async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type != 'admin') return res.status(404).send();
	
	// filename : student_file
	// hod : hod 
	// dueDate 
	// acadYear 

	if (!req.files)
		return res.send("No File Selected ");
	
	file = req.files.student_file
	if (file.name.slice(-4,file.name.length) != ".csv" && file.name.slice(-5,file.name.length) !=".xlsx")
		return res.send("Please select A .csv file or a .xlsx file");

	department = req.user.department.trim();
	if (file.name.slice(-4,file.name.length) == ".csv")
	{
		lines = file.data.toString('utf8').split('\n');
		for ( i = 0 ; i < lines.length ; i++ )
		{
			if (lines[i].trim() != ""){
				atributes = lines[i].split(',');
				name = atributes[0].trim();
				rollno = atributes[1].trim();
				email = atributes[2].trim();
				groupName = atributes[3].trim();
				console.log(name,rollno,email,groupName);
				await dbm.addToDatabase(req.user,name,rollno,email,department,"student", groupName);
			}
		 }
	}
	else if( file.name.slice(-5,file.name.length) ==".xlsx")
	{
		lines = xlsx.parse(file.data)[0].data; // parses a buffer
		for (i = 0 ; i < lines.length ; i++){
			name = lines[i][0];
			rollno = lines[i][1];
			email = lines[i][2];
			groupName = lines[i][3];

			console.log(name,rollno,email,groupName);
			await dbm.addToDatabase(req.user,name,rollno,email,department,"student", groupName);
		}
		
	}
	dbm.addToDatabase(req.user,req.body.hodName.trim(),null,req.body.hodEmail,department,"hod") ;
	// dbm.addToDatabase(req.user,req.body.picName.trim(),null,req.body.picEmail,department,"pic") ;
	// dbm.addToDatabase(req.user,req.body.igName.trim(),null,req.body.igEmail,department,"ig");
	try{
		groups = await dbm.generateGroups(req.user,req.body.dueDate,req.body.acadYear);
		res.status(200).send("OK");
	}catch{
		res.status(500).send();
	}
});

//getStudents?by=name
router.get('/getStudents',async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type == 'student') return res.status(404).send();
	let items = await dbm.getStudents(req.user,req.query.by);
	res.send(JSON.stringify(items));
});


router.post('/student', async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type != 'student') return res.status(404).send();
	if (!req.files) return res.status(422).send();
	req.files.file1.mv('public/'+req.user.id.trim()+"pref1"+req.files.file1.name,function(err){
		if (err) throw (err);
	})
	req.files.file2.mv('public/'+req.user.id.trim()+"pref2"+req.files.file2.name,function(err){
		if (err) throw (err);
	})
	req.files.file3.mv('public/'+req.user.id.trim()+"pref3"+req.files.file3.name,function(err){
		if (err) throw (err);
	})

	if (req.body.proposals){
		try{
			let proposals = JSON.parse(req.body.proposals);
			proposals[0].attachPrints = req.user.id.trim()+"pref1"+req.files.file1.name;
			proposals[1].attachPrints = req.user.id.trim()+"pref2"+req.files.file2.name;
			proposals[2].attachPrints = req.user.id.trim()+"pref3"+req.files.file3.name;
			await dbm.addProposals(req.user,proposals);
			return res.status(200).send("Your Proposals was recorded Successfully!..");
		}catch{
			return res.status(500).send()
		}
	}
});

router.post('/comment',async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type =='student') return res.status(404).send();
	// id => group id
	// msg => comment by staff
	try{
		await dbm.addComment(req.user,req.body.id,req.body.msg);
		return res.status(200).send();
	}catch{
		res.status(500).send();
	}
});

router.post('/approve',async function(req,res){	
	if (!req.user) return res.status(404).send();
	if (req.user.type != 'admin' && req.user.type != 'hod') return res.status(404).send();
	// id => group id
	// pid => proposal id
	try {
		await dbm.approve(req.body.id,req.body.pid,req.user.type);
		return res.status(200).send();
	}catch{
		res.status(500).send();
	}
})

router.post('/addmember',async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type != 'admin') return res.status(404).send();

	// id => group id
	// student name
	// student rollno
	// student email
	// student department
	// student groupName
	// addToDatabase(admin,name,rollno,email, department, type, groupName = null) 
	try {
		student =  await dbm.addToDatabase(req.user,req.body.name,req.body.rollno,req.body.email,req.body.department,"student",req.body.groupName);
		await dbm.addMemberToGroup(req.body.id.trim(),student);
		return res.status(200).send("OK");
	}catch{
		return res.status(500).send();
	}
})

router.post('/updateDueDate',async function(req,res){
	if (!req.user) return res.status(404).send()
	if (req.user.type != 'admin') return res.status(404).send()
	try {
		await dbm.updateDueDate(req.user,req.body.dueDate);
		return res.status(200).send("OK");
	}
	catch{
		return res.status(500).send("OK");
	}
})

//serverURL/addGuide?type=new
router.post('/addGuide',async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type != 'admin') return res.status(404).send();
	// email 
	// name
	// groupId
	try {
		if (req.query.type == "new"){
			await dbm.addToDatabase(req.user,req.body.name.trim(),null,req.body.email.trim(),req.user.department,'guide');
		}
		await dbm.addGuide(req.body.email.trim(),req.body.name.trim(),req.body.groupId.trim())
		return res.status(200).send("OK");
	}catch {
		return res.status(500).send();
	}
})
router.get('/getGuide',async function(req,res){
	if (!req.user) return res.status(404).send();
	if (req.user.type != 'admin') return res.status(404).send();
	try {
		guides = await dbm.getGuide(req.user);
		return res.status(200).send(guides);
	}catch{
		return res.status(500).send();
	}
})


module.exports = router;