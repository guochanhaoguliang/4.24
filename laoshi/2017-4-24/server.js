//引入框架
var express=require('express');
var static=require('express-static');
var mysql=require('mysql');
//创建服务器
var server=express();
//监听 设置端口
server.listen(1334);
//设置静态文件的权限
server.use(static('w3c'));
//链接数据库
var db=mysql.createConnection({"host":"localhost","user":"root","password":"","database":"2017-4-24"});

//登录
//url：/login?user=XXX&pass=XXX
//return  {error:"0",msg:"XXX"}
server.get('/login',function(req,res){
    var data=req.query;
    var user=data.user;
    var pass=data.pass;
    //编写sql
    var sql='SELECT * FROM table_user WHERE user="'+user+'"';
    //执行sql语句
    db.query(sql,function(err,data){
        //console.log(err,data); //null [{}]
        if(data[0]){
            if(data[0].pass==pass){
                res.send('{"error":"0","msg":"登录成功"}')
            }else{
                res.send('{"error":"1","msg":"用户名或密码错误"}')
            }
        }else{
            res.send('{"error":"1","msg":"请注册吧，兄弟"}')
        }
    })
});
//注册
//url: /register?user=XXX&pass=XXX
//return  {error:"0",msg:"XXX"}
server.get('/register',function(req,res){
    var data=req.query;
    var user=data.user;
    var pass=data.pass;

    var selSql='SELECT * FROM table_user WHERE user="'+user+'"';
    var addSql='INSERT INTO table_user VALUES (0,"'+user+'","'+pass+'")';

    db.query(selSql,function(err,data){
        if(data[0]){
            res.send('{"error":"1","msg":"该用户已存在"}');
            res.end();
        }else{
            db.query(addSql,function(err,data){
                res.send('{"error":"0","msg":"注册成功"}')
            });
        }
    });

});












