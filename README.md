# ts-decorator
应用koa ts简单实现接口数据检验、路由装饰器；模拟CORS和auth认证中间件。

## 中间件
```
 auth：简单判断是否包含token，含token则视为已认证，否则要求登录
 CORS：允许POST, GET, OPTIONS, DELETE, PUT；当为预检(OPTIONS)时，直接返回204,代表空响应体;为非预检请求，则继续执行
 ```

## 装饰器
```
路由装饰器：支持get, post, put, delelete请求
prefix：url前缀
validator：根据请求及url验证，请求上下文的params，query，body
```

## 路由列表
```
get     /api/users      获取用户列表
get     /users/:name    获取用户名为name的用户信息
post    /user           新增用户，若用户name已存在则返回失败
put     /users/:name    更新用户信息，若用户name不存在则返回失败
delete  /users/:name    删除，若用户name不存在则返回失败
```

## Project setup
```
npm install
```

## Project run
```
npm start
```
