var express = require('express');
var router = express.Router();
var Users =require('../model/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/list',function(req,res,next){
  Users.find({}, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('user/user-list',{user:rtn});
});
});
router.get('/userdetail/:id',function(req,res,next){
  Users.findById(req.params.id,function(err,rtn){
    if(err) throw err;
res.render('user/userdetail',{user:rtn,title: 'Express'});
});
});

router.get('/update/:id',function(req,res,next){
  Users.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
      res.render('user/user-update',{user:rtn, title:'Express'});
});
});

router.post('/update', function(req,res,next){
  console.log('call');
  var update={
    name: req.body.username,
    email: req.body.useremail,
    password: req.body.userpwd,
  }
    Users.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
    if(err) throw err;
  console.log(rtn);
    res.redirect('/users/userdetail/'+rtn._id);
  });
});

router.post('/delete', function (req,res,next) {
  console.log();

})

module.exports = router;
