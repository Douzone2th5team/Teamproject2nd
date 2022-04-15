const express = require('express');
const app = express();
const { sequelize } = require('./models');

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
http.listen(3001, () => {
    console.log('3001번포트로 실행중');
});

