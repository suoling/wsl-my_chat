var json = require('../sql/usersql.json')
const uuidv4 = require('uuid/v4');
let ejs = require('ejs'),
    users = ['geddy', 'neil', 'alex'];
 
// Just one template
let result = ejs.render('<?= users.join(" | "); ?>', {users: users}, {delimiter: '?'});

console.log(result)
// => 'geddy | neil | alex'
 
// Or globally
result = ejs.delimiter = '$';
console.log(result)
result = ejs.render('<$= users.join(" | "); $>', {users: users});
console.log(result)
// => 'geddy | neil | alex'

console.log(json)
ejs.delimiter = '%';
result = ejs.render(json.selectSQL, {phone: '18710148729', password:'1'})
console.log(result)
result = ejs.render(json.insertSQL, {id: uuidv4(), phone: '18710148729', password:'1'})
console.log(result)