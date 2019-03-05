//todo 这里写客户端的逻辑

// 用户进入命令行的时候提示用户是登录还是注册？

// 如果用户是登录，则提示用户输入用户名和密码，然后拿着这个用户名和密码去和server校验一下，如果是合法的用户则进入聊天
// 界面，如果不合法则提示用户重新输入

// 如果用户注册，则提示用户输入注册的各种信息，然后拿着这些信息去服务器端保存，然后进入聊天界面。
var inquirer = require('inquirer')
var questions = require('../const/const.js')

var request = require('request');

function requestFun (url, sendData) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'POST',
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body: sendData
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
        // console.log(body) // 请求成功的处理逻辑
      } else  {
        reject(error || response.statusCode)
      }
    });
  })
}

async function main (){
  let result = await inquirer.prompt(questions.ifLoginQuestion)
  if(result.event === 'login'){
    result = await inquirer.prompt(questions.loginQuestion)
    result = await requestFun('http://localhost:3000/login', result)

  } else if (result.event === 'register') {
    result = await inquirer.prompt(questions.registerQuestion)
    result = await requestFun('http://localhost:3000/register', result)
  }
  return result
}

main().then(res => {
  console.log(res)
})
