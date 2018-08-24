const models = require('./db');
const express = require('express');
const router = express.Router();//这里用到了express的路由级中间件

//创建账号的接口
//  /api为代理的服务
router.post('/api/user/register',(req,res) => {
	//这里的req.body 其实使用了body-parser中间件 用来对前端发送来的数据进行解析
	//查询数据库中name= req.body.name 的数据
	models.Login.find({name: req.body.name},(err,data) => {
		if(err){
			res.send({'status': 1002, 'message': '查询失败', 'data': err});
		}else{
			console.log('查询成功'+data)
			//data为返回的数据库中的有相同name的集合
			if(data.length > 0){
				res.send({'status': 1001, 'message': '该用户名已经注册！'});
			}else{
				let newName = new models.Login({
                    name : req.body.name,
                    password : req.body.password
                });
                //newName.save 往数据库中插入数据
                newName.save((err,data) => {
                    if (err) {
                        res.send({'status': 1002, 'message': '注册失败！', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '注册成功!'});
                    }
                });
			}
		}
	})
})
//登录接口
router.post('/api/user/login',(req,res) => {
	models.Login.find({name: req.body.name, password: req.body.password},(err,data) => {
		if (err) {
            // res.send(err);
            res.send({'status': 1002, 'message': '查询数据库失败!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': '登录成功!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': '登录失败，该用户没有注册!', 'data': err});
            }
        }
	})
})
//获取所有账号的接口
router.get('/api/user/all',(req,res) => {
    // 通过模型去查找数据库
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
//删除账号
router.post('/api/user/delete',(req,res) => {
    // 通过模型去查找数据库
    models.Login.remove({name: req.body.name},(err,data) => {
        // if (err) {
        //     res.send(err);
        // } else {
        // 	 res.send({'status': 1003, 'message': '删除成功!', 'data': data});
        // }
    });
    models.Login.find((err,data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({'status': 1000, 'message': '更新成功！', 'data': data});
        }
    });
});

module.exports = router;