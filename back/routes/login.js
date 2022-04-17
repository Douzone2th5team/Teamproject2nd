const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const router = express.Router();
const config = require('../config/config.json');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(logger('dev'));
router.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록
router.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'] }));

const pool = mysql.createPool(config.development);

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const userPw = req.body.userPw;

    console.log(`email : ${email}, userPw:${userPw}`);

    if (pool) {
        LoginMember(email, userPw, (err, result) => {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                console.log(result);
                if (result[0] != undefined) {
                    console.log(bcrypt.compareSync(userPw, result[0].userPw))
                    if (!bcrypt.compareSync(userPw, result[0].userPw)) {
                        console.log(userPw);
                        console.log(result[0].userPw);
                        console.log('패스워드 일치 x');
                        res.send(false)
                    } else {
                        console.log(bcrypt.compareSync(userPw, result[0].userPw))
                        console.log(result[0]);
                        console.log(result);
                        console.log(userPw);
                        console.log(result[0].userPw);
                        let dataLoading = true;
                        if (result[0] != null) {
                            console.log('aaa')
                            console.log(req.session.cookie)
                            console.log(req.session.user);
                            console.log(res.json);
                            res.cookie('three', result[0].id, {maxAge:1000000});
                            res.json(result[0].id);
                            const hi = new Promise((resolve, reject) => {
                                if (dataLoading) {
                                    resolve("true");
                                } else {
                                    reject("false");
                                }
                            });
                            hi.then((res) => console.log(`Resolve : ${res}`))
                                .catch((err) => console.log(err));
                        } else {
                            res.send(false);
                            console.log(false);
                        }
                    }
                } else {
                    console.log(result[0]);
                    console.log('해당 유저가 없습니다.');
                    res.send(false);
                }

            }
        })
    }
})


const LoginMember = function (email, userPw, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql = conn.query('select * from member where email=?', [email], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    if (result == "") {
                        callback(null, false);
                    } else {
                        callback(null, result);
                    }
                }
            })
        }
    })
}
module.exports = router