const express = require('express');
const app = express();
const { sequelize } = require('./models');
const cors = require("cors");

const loginRouter = require('./routes/login.js');

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })

app.use(loginRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.listen(3001, (err) => {
    if(err) return console.log(err)
        console.log('3001번포트로 실행중');
});

