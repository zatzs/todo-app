


module.exports = function(app,db, passport){

//reading data
app.get('/toDo',isLoggedIn, function(req, res){
console.log('Get request made');
console.log(req.user);
let sql = 'SELECT * FROM todoItems WHERE userID =' + req.user.id +';';
db.query(sql, (err,results)=>{
    if(err){
      throw err;
    }
    console.log(results);
    res.render('toDo', {todos: results, user: req.user});
  });
});

//posting data
app.post('/toDo', function(req, res){
console.log('Post request made');
let item =req.body;
item['userID'] = req.user.id;
console.log(item);
let sql = 'INSERT INTO todoItems SET ?';
let query = db.query(sql, item, function(err, result){
    if(err){
      throw err;
    }
    console.log(result);
    res.json(result);
  });

});

//destroying data
app.delete('/toDo/:id',function(req, res){
console.log('Delete request made');
let sql = `DELETE FROM todoItems WHERE id= ${req.params.id};`;
db.query(sql, (err, result) =>{
  if(err){
    throw err;

  }
  res.json(result);

});




});


app.get('/signup', function(req, res){
  res.render('signup');
});

//handling sign up form
app.post('/signup', passport.authenticate('local-signup',  {
     successRedirect: '/todo',
     failureRedirect: '/signup'}
    )
  );

//displaying sign in
app.get('/signin', function(req,res){

	res.render('signin', {message: req.flash('loginMessage')});

});

//handling sign in form
app.post('/signin', passport.authenticate('local-signin',  {
     successRedirect: '/todo',
     failureRedirect: '/signin'}
    )
  );

//destroying sessions
app.get('/logout',function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
});



});
};
function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.redirect('/signin');
  }
