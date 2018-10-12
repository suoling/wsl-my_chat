//todo 这里写客户端的逻辑

// 用户进入命令行的时候提示用户是登录还是注册？

// 如果用户是登录，则提示用户输入用户名和密码，然后拿着这个用户名和密码去和server校验一下，如果是合法的用户则进入聊天
// 界面，如果不合法则提示用户重新输入

// 如果用户注册，则提示用户输入注册的各种信息，然后拿着这些信息去服务器端保存，然后进入聊天界面。
var inquirer = require('inquirer')
var questions = require('../const/const.js')

inquirer.prompt(questions.ifLoginQuestion).then(ifLoginAnswers => {
  if (ifLoginAnswers.event === 'login') {
    inquirer.prompt(questions.loginQuestion).then(loginAnswers => {
      console.log(loginAnswers)
    })
  } else if (ifLoginAnswers.event === 'register') {
    inquirer.prompt(questions.registerQuestion).then(registerAnswers => {
      console.log(registerAnswers)
    })
  }
  // console.log(JSON.stringify(answers, null, '  '));
});