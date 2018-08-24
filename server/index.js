const api = require('./api');
//操作文件，读写文件
const fs = require('fs');
const path = require('path');
//解析前端发送来的数据
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
// express.static 用来处理静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
app.listen(8011);
console.log('success listen......');