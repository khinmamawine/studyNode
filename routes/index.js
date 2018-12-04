var express = require('express');
var router = express.Router();
var Users =require('../model/Users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data/:khin', function(req,res,next) {
  res.end('phone number is ='+ req.params.khin);
});

router.get('/hello', function(req,res,next) {
  res.render('hello' ,{ title: 'Express' });
});
router.get('/login', function(req,res,next) {
  res.render('login',{ title: 'Express' });
});

  router.post('/login', function(req,res,next){
    Users.findOne({email:req.body.useremail},function(err,rtn){
      if(err) throw err;
      if(rtn != null && Users.compare(req.body.userpwd,rtn.password)){
        req.session.user ={ name: rtn.name,email:rtn.email,id:rtn._id};
        res.redirect('/users/userdetail/'+rtn._id);
      }else {
        res.redirect('/login');
      }
    });
  });
router.get('/singup', function(req,res,next) {
  res.render('singup',{ title: 'Express' });
});

router.post('/emaildu',function(req,res){
  console.log(req.body);
  Users.findOne({email:req.body.email},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    if(rtn != null){
      res.json({status:false})
    }else {
      res.json({status:true})
    }
  });
});
router.get('/singup2', function(req,res,next) {
  res.render('singup2',{ title: 'Express' });
});



router.post('/singup', function(req,res,next) {
var user= new Users();
user.name=req.body.username;
user.email=req.body.useremail;
user.password=req.body.userpwd;
user.save(function(err,rtn){
  if(err) throw err;

res.render('user/user-detail',{user1:rtn,title: 'Express' });
console.log(user);
});
});
module.exports = router;
