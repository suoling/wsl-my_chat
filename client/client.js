//todo 这里写客户端的逻辑

// 用户进入命令行的时候提示用户是登录还是注册？

// 如果用户是登录，则提示用户输入用户名和密码，然后拿着这个用户名和密码去和server校验一下，如果是合法的用户则进入聊天
// 界面，如果不合法则提示用户重新输入

// 如果用户注册，则提示用户输入注册的各种信息，然后拿着这些信息去服务器端保存，然后进入聊天界面。
var inquirer = require('inquirer')
var questions = require('../const/const.js')

var request = require('request');

// var requestData={name: 'wsl', age: '25'};
// request({
//     url: url,
//     method: 'POST,
//     json: true,
//     headers: {
//         'content-type': 'application/json',
//     },
//     body: requestData
// }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // 请求成功的处理逻辑
//     }
// });


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

// async function userLogin(){
//   let userInput = await inquirer.prompt(questions.ifLoginQuestion)
//   let requestResult = await requestFun(userInput)
//   return requestresult
// }

// userLogin.then()
// async function ifLogin (questions) {
//   return await inquirer.prompt(questions)
// }
// ifLogin(questions.ifLoginQuestion).then((result) => {
//   console.log(result)
// })
// var ifLoginAnswers = await ifLogin()
// if (ifLoginAnswers.event === 'login') {
//   var url='http://localhost:3000/login';
//   // var loginAnswers = await inquirer.prompt(questions.loginQuestion)
//   // requestFun(url, loginAnswers)

// } else if (ifLoginAnswers.event === 'register') {
//   var url='http://localhost:3000/register';
//   // var registerAnswers = await inquirer.prompt(questions.registerQuestion)
//   // requestFun(url, registerAnswers)
// }

// inquirer.prompt(questions.ifLoginQuestion).then(ifLoginAnswers => {
//   if (ifLoginAnswers.event === 'login') {
//     var url='http://localhost:3000/login';
//     inquirer.prompt(questions.loginQuestion).then(loginAnswers => {
//       console.log(loginAnswers)
//       request({
//         url: url,
//         method: 'POST',
//         json: true,
//         headers: {

//             'content-type': 'application/json',
//         },
//         body: loginAnswers
//       }, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body) // 请求成功的处理逻辑
//         }
//       });
//     })
//   } else if (ifLoginAnswers.event === 'register') {
//     var url='http://localhost:3000/register';
//     inquirer.prompt(questions.registerQuestion).then(registerAnswers => {
//       console.log(registerAnswers)
//       request({
//         url: url,
//         method: 'POST',
//         json: true,
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: registerAnswers
//       }, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body) // 请求成功的处理逻辑
//         }
//       });
//     })
//   }
//   // console.log(JSON.stringify(answers, null, '  '));
// });

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
