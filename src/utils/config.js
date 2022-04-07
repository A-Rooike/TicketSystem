// const express=require("express");
// const mysql=require("mysql");

// var app=express();

// //连接数据库
// var db=mysql.createConnection({host: "localhost",
// 							port: "3306",
// 							user: "root",
// 							password: "123456",
// 							database: "dwawa"});
// //2.发送请求(查询)
// db.query("SELECT * FROM students",function(err,data){
// 	if(err){
// 		console.log("数据库访问出错",err);
// 	}else{
// 		console.log(data);
// 	}
// })

// app.get("/",function(req,res){
// 	res.send("express");
// });

// app.listen(8080);
