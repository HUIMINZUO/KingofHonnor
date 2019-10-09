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

![](Test_files/4.jpg)

## 错题(坑): 之前一直再改'登录'的问题(密码有误一直显示不出来),后来突然发现是自己掉进自己设的坑里面去了
## 原来登录的账号和密码是要和管理员页面设置的账号和密码一致,当时就是没有意识到,所以浪费了好几个小时
## 还好,问题找到,加油,虽然是看着教学视频学习的,但是也得努力向前看

### 日期：2019-10-08-11 11：30
### 此次的任务要求：服务端的登录校验

## 没有 token 就不允许访问

# 服务端登录校验
## 添加一个拦截器（server/routes/admin/index.js）
```
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
```

## Berar 就是行业内的一个规范

## const token = req.headers.authorization
![](Test_files/5.jpg)

## const token = String(req.headers.authorization || '').split(' ').pop()
![](Test_files/7.jpg)

```
const tokenData = jwt.verify(token, app.get('secret'))
		// console.log(token)
		console.log(tokenData)
		
```
![](Test_files/8.jpg)
dos命令输出的那个 ID 和 iat 就是 上图中管理员的账号
我们可以通过用户的ID 来删除token，也可以使用token来解析ID
![](Test_files/6.jpg)

```
router.get('/',async (req, res, next) => {
		// 此操作用于校验用户是否登录
		// 第一步，获取用户的信息
		// const token = req.headers.authorization
		const token = String(req.headers.authorization || '').split(' ').pop()
		// const tokenData = jwt.verify(token, app.get('secret'))
		const { id } = jwt.verify(token, app.get('secret'))
		<!-- 服务端请求的时候，知道用户端是谁 -->
		req.user = await AdminUser.findById(id)
		console.log(req.user)
		// console.log(token)
		// console.log(tokenData)
		await next()
```
![](Test_files/9.jpg)