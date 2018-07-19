const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});


module.exports = function(app,db){

//reading data
app.get('/',function(req, res){
console.log('Get request made');
let sql = 'SELECT * FROM todoItems;';
db.query(sql, (err,results)=>{
    if(err){
      throw err;
    }
    console.log(results);
    res.render('toDo', {todos: results});
  });
});

//posting data
app.post('/toDo', urlencodeParser, function(req, res){
console.log('Post request made');
let item =req.body;
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

};
