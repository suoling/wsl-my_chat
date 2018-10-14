var sqlite3 = require('sqlite3');
var fs = require('fs');

var db = new sqlite3.Database('../db/user.db', function (err) {
    if(err){
       console.log("异常")
    } else {
        db.run(getInitSQL('./init.sql'), function(err){
            if(err){
                console.log(err)
            }
        })
    }
})


var getInitSQL = function (path) {
    return fs.readFileSync(path).toString()
}


