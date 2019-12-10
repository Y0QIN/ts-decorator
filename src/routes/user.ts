import * as Koa from 'koa';
import {get, post, put, del, prefix, validator} from '../utils/decorators';
import {requestAuth} from "../middlewares/auth";
import {requestCors} from "../middlewares/cors";

let userList = [
    {name: 'KangKang', age: 20},
    {name: 'Jane', age: 20},
    {name: 'Maria', age: 20}
];

@prefix('/api')
class user {
    @get('/users', {middlewares: [requestCors, requestAuth]})
    public async list(ctx) {
        ctx.body = {status: 1, data: userList};
    }

    @get('/users/:name', {middlewares: [requestCors, requestAuth]})
    @validator({
        params: {
            name: {type: 'string', required: true}
        }
    })
    public async getUser(ctx) {
        let users = userList.filter(user => user.name === ctx.params.name);
        if (users.length === 0) {
            ctx.body = {status: 0, data: null};
            return;
        }
        ctx.body = {status: 1, data: users};
    }

    @post('/user', {middlewares: [requestAuth]})
    @validator({
        body: {
            name: {type: 'string', required: true},
            age: {type: 'number', required: true}
        }
    })
    public async addUser(ctx) {
        let filterUsers = userList.filter(user => user.name === ctx.request.body.name);
        if (filterUsers.length > 0) {
            ctx.body = {status: 0, msg: '该用户名已存在'};
            return;
        }
        userList.push(ctx.request.body);
        ctx.body = {status: 1, msg: '添加用户成功'};
    }

    @put('/users/:name', {middlewares: [requestAuth]})
    @validator({
        params: {
            name: {type: 'string', required: true}
        },
        body: {
            name: {type: 'string', required: true},
            age: {type: 'number', required: true}
        }
    })
    public async updateUser(ctx) {
        let filterUsers = userList.filter(user => user.name === ctx.params.name);
        if (filterUsers.length < 1) {
            ctx.body = {status: 0, msg: '用户不存在'};
            return;
        }
        filterUsers = userList.filter(user => user.name === ctx.request.body.name);
        if (filterUsers.length > 0) {
            ctx.body = {status: 0, msg: '用户名已存在,请重新输入'};
            return;
        }
        let i = 0;
        for (; i < userList.length; i++) {
            if (userList[i].name === ctx.params.name) {
                userList[i] = ctx.request.body;
                break;
            }
        }
        let status = i > userList.length ? 0 : 1;
        let msg = i > userList.length ? '用户不存在' : '用户信息更新成功';
        ctx.body = {status, msg};
    }

    @del('/users/:name', {middlewares: [requestAuth]})
    @validator({
        params: {
            name: {type: 'string', required: true}
        }
    })
    public async delUser(ctx) {
        let users = userList.filter(user => user.name != ctx.params.name);
        let status = users.length < userList.length ? 1 : 0;
        let msg = users.length < userList.length ? '用户删除成功' : '用户不存在';
        userList = users;
        ctx.body = {status, msg};
    }


}
