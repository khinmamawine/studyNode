var express = require('express');
var router = express.Router();
var Book=require('../model/Book');

router.get('/', function(req, res, next) {
  res.send('end');
});
router.get('/postadd', function(req, res, next) {
  res.render('postadd');
});
router.post('/postadd', function(req, res, next) {
  var book= new Book();
book.title=req.body.title;
  book.author=req.body.author;
  book.content=req.body.content;
  book.save(function(err,rtn){
    if(err) throw err;
  res.redirect('/posts/post-detail/'+rtn._id);
  console.log(book);
  });
  });
  router.get('/post-detail/:id',function(req,res,next){
    Book.findById(req.params.id,function(err,rtn){
      if(err) throw err;
  res.render('user/post-detail',{book:rtn});
  });
  });


module.exports = router;
