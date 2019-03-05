// todo 这里写服务端的逻辑
// 用户登录时， 根据客户端给的账号和密码去数据库里校验，然后将校验结果返回给客户端。
// 用户注册时，将客户端传递过来的信息保存到数据库，然后将保存成功的信息返回给客户端。
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const uuidv4 = require('uuid/v4');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var ejs = require('ejs')
var json = require('../sql/usersql.json')
var path = '../db/user.db'

const app = new Koa();
app.use(bodyParser());
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

router.post('/register', async (ctx, next) => {
    var obj = ctx.request.body
    // var insertSql = "insert into user values('" + uuidv4() + "','" + obj.phone + "','" + obj.password_first + "')"
    var insertSql = ejs.render(json.insertSQL, {id: uuidv4(), phone: obj.phone, password:obj.password_first}, {delimiter: '%'})
    console.log(insertSql)
    var result = await doExecuteSql(insertSql)
    if (result) {
        var selectAll = await doExecuteSql("select * from user")
        ctx.response.body = { status: 1, message: 'success' }
    } else {
        ctx.response.body = { status: 0, message: 'error' }
    }
})

router.post('/login', async (ctx, next) => {
    var requestParam = ctx.request.body
    // var selectSql = "select * from user where phone='" + requestParam.phone + "'and password='" + requestParam.password + "'"
    var selectSql = ejs.render(json.selectSQL, requestParam, {delimiter: '%'})
    var result = await doExecuteSql(selectSql)
    console.log('selectSql:', selectSql)
    console.log('result:', result)
    if (!result.length) {
        ctx.response.body = { status: 0, message: 'error' }
    } else {
        ctx.response.body = { status: 1, message: 'success' }
    }
})

function getDB (path) {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(path, function (err) {
            if (!err) {
                resolve(db)
            } else {
                reject(err)
            }
        })
    })
}
// 执行SQL语句，入参是SQL语句，出参是执行结果
async function doExecuteSql(sql){
    let db = await getDB(path)
    let result =await executeSql(db, sql)
    return result
}
function executeSql (db, sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, function (err, res) {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    })
}

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
