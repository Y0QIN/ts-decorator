export const requestAuth = async (ctx, next) => {
    console.log(`Request url: ${ctx.method} ${ctx.url}`);
    if(ctx.header&&ctx.header.token){
        await next();
    }else{
        ctx.body = {status: 0, msg: '请登录'};
        return ;
    }
    
};