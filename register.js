var sqlite3 = require('sqlite3');
var fs= require('fs');
var inquirer = require('inquirer')
// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
var questions = [
  {
    type: 'input',
    name: 'phone',
    message: "What's your phone number?",
    validate: function(value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return 'Please enter a valid phone number';
    }
  }
]
inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
});
var createTableSQL = "create table user(phone varchar(15), password varchar(15))"
var path = './1.db';
// fs.exists(path, function (exists) {
//   if (!exists) {
//     getDB(path, function(err, db){
//       executeSQL(db, createTableSQL, function(err,res){
//         insertData(db)
//       })
//     })
//   } else {
//     getDB(path, function(err, db){
//       insertData(db)
//       selectData(db)
//     })
//   }
// });
function getDB(path, callback){
  var db = new sqlite3.Database(path, function(err){
    if(err){
      callback(err, null)
    } else {
      callback(null, db)
    }
  })
}
function executeSQL(db,sql,callback){
   db.run(sql,function(err,res){
     if(err){
       callback(err,null)
     } else {
       callback(null, res)
     }
   })
}
function insertData (db) {
  db.run("insert into user values('17600296965', 'yyy0904')", function (err, res) {
    if (!err) {
      console.log('insert data success')
    } else {
      console.log('insert data error')
    }
  })
}
function selectData (db) {
  db.all("select * from user",function(err,res){
    if(!err)
    console.log(JSON.stringify(res));
    else
    console.log(err);
  });
}
