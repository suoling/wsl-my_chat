async function hello(){
    return "Hello World"
}

async function err(){
    throw new Error("我是一个错误")
}


hello().then((result) =>{console.log(result)})


err()
.then((result) => { console.log(result)})
.catch((error)=>{console.log(error)})


const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    console.log(1)
    await delay(2000);
    console.log(2)
    await delay(3000);
    console.log(3)
    return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'