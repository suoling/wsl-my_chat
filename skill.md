- 在聊天程序的构建过程中，第一个需求是需要用户登录和注册，其中注册过程中涉及到大量的交互，
   需要用户输入姓名，性别（可选择），电话号码（需要校验）......等等信息，而node.js提供的
   命令行工具并不能提供这样的支持，而根据自己的经验，现在有根据node.js构建的大量的三方程序
   中涉及到这样的功能（提示用户输入某种信息，可选择的信息，以及输入校验等等），而且这样的
   需求在构建命令行程序的时候非常常见，那么肯定有这样的三方库已经写好了，那我们去百度一下
   那么我们百度的关键字是什么呢？ node.js 命令行交互， 这是我们想到的最为关键和准切的搜索
   字，根据快速浏览百度第一页的博客文章，我们可以发现node.js中已经提供了这样一个库 
	[参考库](https://github.com/sboudrias/Inquirer.js)

- 现在可以处理用户输入的问题了，在接下来的开发过程中还会遇到各种各样的问题，可以根据上面
   这段话去思考。

- wslchat程序是一个聊天程序，模仿weichant来写。