// 判断是登录还是注册
const ifLoginQuestion = [
  {
    type: 'list',
    name: 'event',
    message: 'Do you want to login or register?',
    choices: ['login', 'register'],
    filter: function(val) {
        return val.toLowerCase();
    }
  }
]
// 登录
const loginQuestion = [
  {
    type: 'input',
    name: 'phone',
    message: 'Please enter your ID?',
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return 'Your ID is error. Please enter currect ID';
    }
  },
  {
    type: 'password',
    message: 'Please enter your password',
    name: 'password',
    validate: function (value) {
      if (/\w/.test(value) && /\d/.test(value)) {
        return true;
      }
      return 'Your password is error. Please enter currect password';
    }
  }
]
// 注册
let pwd_firsr
const registerQuestion = [
  {
    type: 'input',
    name: 'name',
    message: "Please enter your name"
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Please enter your phone number as your ID when you login',
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return 'Please enter a valid phone number';
    }
  },
  {
    type: 'password',
    message: 'Please enter your password',
    name: 'password_first',
    validate: function (value) {
      if (/\w/.test(value) && /\d/.test(value)) {
        pwd_firsr = value
        return true;
      }
      return 'Password need to have at least a letter and a number';
    }
  },
  {
    type: 'password',
    message: 'Please confirm your password',
    name: 'password_second',
    validate: function (value) {
      if (value === pwd_firsr) {
        return true;
      }
      return 'The two passwords do not match. Please try again';
    }
  }
]

module.exports.ifLoginQuestion = ifLoginQuestion
module.exports.loginQuestion = loginQuestion
module.exports.registerQuestion = registerQuestion
