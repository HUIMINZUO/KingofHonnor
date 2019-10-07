## 本次主要完成了图片框的显示

## 管理员账号管理：密码使用了 bcrypt
## 在server文件下安装命令：npm install bcrypt
## 编写日期：2019年10月7日

## 在做登录接口的时候，对于用户名不存在的需要在全局做一个捕获
## 在'admin/views/http.js'文件夹添加一个全局捕获的代码，主要是捕获用户名是否存在
## 相关文档的资料在'www.npmjs.com',查找axios 中的Interceptors

## console.log(err.name) ->截图如下
![](Test_files/1.jpg)

## console.log(err.response) =>错误对象上面有一个返回对象
![](Test_files/2.jpg)

## console.log(err.response.data) =>返回报错的响应数据，能够更加的具体知道错误是什么
## console.log(err.response.data.message) =>返回报错的具体对象
![](Test_files/3.jpg)


## 引入 'Vue'，
##  Vue.prototype.$message 此代码段的作用是：如果某个用户名不存在的话，就用弹框显示
##  
##  如果用户名和密码都没问题，返回taken，需要安装'npm install jsonwebtoken'
##  singn(payload: string | object | Buffer, secretOrPrivatekey: Secret,options?: SignOPtions):string
##  secretOrPrivatekey 这个密钥很重要，用户在生成'token'的时候，就给它一个密钥，然后再去根据这个算法去生成一个'token'，生成完之后客户端
##  可以不需要密钥就给它解出来
##  但是要验证是否篡改过，就需要使用另外一种方法：jwt.sign()

## 尝试添加一个效果，在登录成功之后，根据账户来设置，弹出'欢迎您再次回归',res.send()可以实现(admin->index.js)