const express = require('express');
const bodyParser = require('body-parser'); // post방식
const mysql = require('mysql');
const logger = require('morgan'); // 로그모듈
const config = require('../config/config.json').development;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); // 암호화 (현업에서 salt랑 가장 많이 사용)
const saltRounds = 10; // 해킹 방지를 위한 접근 제한 변수
const nodemailer = require('nodemailer'); // 임시 비밀번호 보내기
const multer = require('multer'); // 이미지 업로드
const cors = require('cors');
const makeJwt = require('./jwt')
const googleOAuth = require('./googleOAuth')
const configMail = require('../config/configMail.json').mail;

const router = express.Router(); // 라우터 사용(특정 경로로 들어오는 요청에 대해 함수를 수행 시킬 수 있는 기능을 express가 제공)

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(logger('dev'));
router.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록
router.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'] }));
const pool = mysql.createPool(config);

// 회원가입
// http://127.0.0.1:3000/member/regist (post)
router.route('/member/regist').post((req, res) => {
    const email = req.body.email;
    const userPw = req.body.userPw;
    const name = req.body.name;
    const tel = req.body.tel;
    const code = req.body.code;

    console.log(`email: ${email}, userpw:${userPw}, name:${name}, tel:${tel}, code:${code}`);
    if (pool) {
        joinMember(email, userPw, name, tel, code, (err, result) => {
            if (err) {
                console.log(err);
                res.send(false)
                res.end();
            } else {
                res.send(true);
                res.end();
            }
        });
    }
});

const joinMember = function (email, userPw, name, tel, code, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const encryptedPassword = bcrypt.hashSync(userPw, saltRounds) // 비밀번호 암호화
            const sql = conn.query('insert into member(email, userPw, name, tel, code,createdat) values (?, ?, ?, ?, \'2번\',\'2022-04-10\')', [email, encryptedPassword, name, tel], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    console.log("가입완료!");
                    callback(null, result);
                }
            });
        }
    });
}


router.route('/member/googleLogin').get((req, res) => {
    console.log(googleOAuth.url)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.redirect(googleOAuth.url);
})

router.route('/member/login').post((req, res) => {
    const email = req.body.email;
    const userPw = req.body.userPw;

    console.log(`email : ${email}, userPw:${userPw}`);
    if (pool) {
        LoginMember(email, userPw, (err, result) => {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                console.log("aaaaaa")
                console.log(result[0].resign);
                if (result[0] != undefined) {
                    console.log(bcrypt.compareSync(userPw, result[0].userPw))
                    if (!bcrypt.compareSync(userPw, result[0].userPw)) {
                        console.log(userPw);
                        console.log(result[0].userPw);
                        console.log('패스워드 일치 x');
                        res.send(false)
                    } else if(result[0].resign === 1){
                        console.log('탈퇴한 회원입니다.')
                        res.send(false);
                    }else{
                        console.log(bcrypt.compareSync(userPw, result[0].userPw))
                        console.log(result[0]);
                        console.log(result);
                        console.log(userPw);
                        console.log(result[0].userPw);
                        let dataLoading = true;
                        if (result[0] != null) {
                            console.log(result[0].id)
                            res.cookie('three', result[0].id);
                            console.log(result[0].id)
                            console.log(makeJwt.decodePayload(makeJwt.makeToken(result[0].id,email).token))
                            res.cookie('jwt_test', makeJwt.makeToken(result[0].id,email).token);
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
    console.log(pool);
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

// 쿠키 값 가져오기
router.route('/getCookie').get((req, res) => {
    res.send(req.cookies.three);
})


// 로그아웃
// router.route('/member/logout').get((req, res) => {
//     req.session.destroy(function (err, result) {
//         console.log(req.session)
//         res.send(result);
//     });
// });


// 이메일 찾기
router.route('/member/findId').post((req, res) => {
    const tel = req.body.tel;
    console.log(tel);
    pool.query('select tel, email from member where tel=?', [tel], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data === "") {
                res.send(false);
                res.end();
                return
            }
            if (tel === data[0].tel) {
                res.send(emailSecurity(data))
                res.end();
            } else {
                res.send(false);
                res.end();
            }
        }
    });
});

function emailSecurity(data) {
    var id = data[0].email.split('@')[0];
    var mail = data[0].email.split('@')[1];
    console.log(id)
    console.log(mail)
    var maskingId = function (id) {
        var splitId = id.substring(0, 1);
        for (var i = 1; i < id.length; i++) {
            splitId += '*';
        }
        return splitId;
    };
    var maskingMail = function (mail) {
        var splitMail = mail.substring(0, 1);
        for (var i = 1; i < mail.length; i++) {
            splitMail += '*';
        }
        return splitMail;
    };
    userEmail = maskingId(id) + '@' + maskingMail(mail);
    return userEmail;
}

// 비밀번호 찾기
router.route('/member/findPassword').post((req, res) => {
    const tel = req.body.tel;
    const email = req.body.email;

    pool.query('select tel,email,userPw from member where tel=? and email=?', [tel, email], (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
            console.log('비밀번호 찾기 실패');
            res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
            res.write('<h2>아이디 또는 비밀번호를 확인해주세요.</h2>');
            res.end();
        } else {
            var variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,!,@,#,$,%,^,&,*".split(",");

            var number = "0,1,2,3,4,5,6,7,8,9".split(",");
            var eng = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            var code = "!,@,#,$,%".split(",");

            var randomPassword = createCode(number, eng, code, 3, 3, 2);


            function createCode(objArr1, objArr2, objArr3, iLength, xLength, kLength) {
                var variable1 = objArr1;
                var variable2 = objArr2;
                var variable3 = objArr3;

                var randomStr = "";
                for (var j = 0; j < iLength; j++) {
                    randomStr += variable1[Math.floor(Math.random() * variable1.length)];
                }
                for (var a = 0; a < xLength; a++) {
                    randomStr += variable2[Math.floor(Math.random() * variable2.length)];
                }
                for (var c = 0; c < kLength; c++) {
                    randomStr += variable3[Math.floor(Math.random() * variable3.length)];
                }
                return randomStr
            }


            const transporter = nodemailer.createTransport({
                service: configMail.SEND_SERVICE,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: { // 이메일을 보낼 계정 데이터 입력
                    user: configMail.SEND_MAIL_ID,
                    pass: configMail.SEND_MAIL_PW,
                },
            });
            const emailOptions = { // 옵션값 설정
                from: configMail.SEND_MAIL_ID,
                to: email,
                subject: 'ASPACIO에서 임시비밀번호를 알려드립니다.',
                html:
                    "<h1 >ASPACIO에서 새로운 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : " + randomPassword + "</h2>"
                    + '<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>',
            };
            transporter.sendMail(emailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email sent : ' + info.response);
                    if (pool) {
                        SendMember(randomPassword, email, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.writeHead('200', { 'content-type': 'text/html;charset=utf-8' });
                                res.write('<h2>비밀번호 업데이트 실패!</h2>');
                                res.write('<p>수정중 오류가 발생했습니다</p>');
                                res.end();
                            } else {
                                res.send(result)
                            }
                        })
                    }
                }
            }); //전송
        }

    })
})
const SendMember = function (randomPassword, email, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const encryptedPassword = bcrypt.hashSync(randomPassword, saltRounds) // 비밀번호 암호화
            conn.query('update member set userPw=? where email=?', [encryptedPassword, email], (err, result) => {
                conn.release();
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    });
}

// 비밀번호 변경
router.route('/member/ComparePassword').post((req, res) => {
    const userPw = req.body.userPw;
    const userPw2 = req.body.userPw2;
    const idx = req.body.idx;

    if (pool) {
        UpdatePassword(userPw, userPw2, idx, (err, result) => {
            if (err) {
                console.log(err);
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>비밀번호 변경 실패!</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            } else {
                res.send(result)
            }
        })
    }

})
const UpdatePassword = function (userPw, userPw2, idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select userPw from member where id=?', [idx], (err1, result1) => {
                if (bcrypt.compareSync(userPw, result1[0].userPw) == false) {
                    callback(null, false);
                    return;
                } else {
                    if (userPw != userPw2) {
                        const encryptedPassword = bcrypt.hashSync(userPw2, saltRounds) // 비밀번호 암호화
                        conn.query('update member set userPw=? where id=?', [encryptedPassword, idx], (err, result) => {
                            conn.release();
                            if (err) {
                                callback(null, false);
                                return;
                            } else {
                                callback(null, result);
                            }
                        })
                    }
                }
            })
        }
    })
}


// 문의,비밀번호변경 - 멤버정보
router.route('/member/imgandname').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        imgandname(idx, (err, result) => {
            if (err) {
                res.send(false)
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})
const imgandname = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select img, name from member where id=?', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    })
}

// 정보 수정
// 기존 데이터를 불러오는 곳
router.route('/member/edit').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        edit(idx, (err, result) => {
            if (err) {
                res.send(false)
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})
const edit = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select img, name, code, message, email, tel from member where id=?', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            })
        }
    })
}

// 여기가 정보 수정하는곳
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO FIX PLZ : 로컬에서 테스트할 때 본인 public/img경로로 바꾸기
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
router.route('/member/editMember').post(upload.single('img'), async (req, res) => {
    const img = req.file;
    const email = req.body.email;
    const changename = req.body.changename;
    const tel = req.body.tel;
    const message = req.body.message;
    const name = req.body.name;

    if (pool) {
        editMember(img, changename, name, tel, message, email, (err, result) => {
            if (err) {
                console.log(err)
                res.send(false);
            } else {
                res.send(true);
                res.end();
            }
        })
    }
});

const editMember = function (img, changename, name, tel, message, email, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            if (img === undefined || img === 'undefined') {

                let sql1 = 'update chats set name=? where name = ?; ';
                let sql1s = mysql.format(sql1, [name, changename]); //mysql.format!
                let sql2 = 'update member set name=?, tel=?, message=? where email=?; '; //?에 하나씩 들어감
                let sql2s = mysql.format(sql2, [name, tel, message, email]);
            
                conn.query(sql1s+sql2s, (err, result) => {
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, true);
                    }
                })
            } else {
                let fileName = 'img/' + img.filename;
                conn.query('update member set img=?, name=?, tel=?, message=? where email=?', [fileName, name, tel, message, email], (err, result) => {
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, true);
                    }
                })
            }

        }
    })
}

// 정보 삭제(탈퇴)
router.route('/member/delete').get((req, res) => {
    const idx = req.query.idx;

    console.log(`idx : ${idx}`);

    if (pool) {
        deleteMember(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>회원삭제 실패!</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            } else {
                if (result.deletedCount > 0) {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원 삭제 실패!</h2>');
                    res.write('<p>회원 삭제 실패하였습니다.</p>');
                    res.end();
                } else {
                    res.send(result)
                }
            }
        });
    }
});

router.route('/chatuser').get((req, res) => {
    console.log('what is this?');
    const id = req.query.id;
    console.log(req);
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql = conn.query('select * from member where id=?', [id], (err, result) => {
                if (err) {
                    console.log('error!');
                    return;
                } else {
                    console.log(result);
                    res.send(result);
                }
            })
        }
    });
});

// 채팅창 친구 초대
router.route('/chatuser').get((req, res) => {
    console.log('what is this?');
    const id = req.query.id;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql = conn.query('select * from member where id=?', [id], (err, result) => {
                if (err) {
                    console.log('error!');
                    return;
                } else {
                    console.log(result);
                    res.send(result);
                }
            })
        }
    });
});

const deleteMember = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            const sql = conn.query('update member set resign = true where id=?', [idx], (err, result) => {
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 문의사항, 친구목록 불러오기
router.route('/inquiry/friend').get((req, res) => {
    const friend = req.query.friend;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // TODO :  친구 이름 말고 id를 받아와서 처리해야 중복데이터가 안 나올텐데..
            conn.query('select * from member where name = ?', [friend], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send(result);
                }
            })
        }
    })
});

// 문의사항 제출
router.route('/inquiry').post((req, res) => {
    const memberid = req.body.memberIdx;
    const title = req.body.title;
    const content = req.body.content;
    const type = req.body.type;
    console.log(memberid, title, content, type);
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            let today = new Date();
            let year = today.getFullYear(); // 년도
            let month = today.getMonth() + 1;  // 월
            let date = today.getDate();  // 날짜
            let dateString = year+'-'+month+'-'+date;

            let hours = ('0' + today.getHours()).slice(-2);
            let minutes = ('0' + today.getMinutes()).slice(-2);
            let seconds = ('0' + today.getSeconds()).slice(-2);
            let timeString = hours + ':' + minutes  + ':' + seconds; // 현재 시간

            conn.query('insert into inquiry(memberId, title, content, type, createdAt) values(?, ?, ?, ?, ?) ', [memberid, title, content, type, dateString+' '+timeString], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send(result);
                }
            })
        }
    })
});

// 문의사항 리스트
router.route('/member/inquirylist').get((req, res) => {
    const memberid = req.query.idx;
    console.log(memberid);
    console.log('help me');
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            conn.query('select * from inquiry where memberId = ?', [memberid], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send(result);
                }
            })
        }
    })
});

// 채팅방에 친구 초대
router.route('/chatuser/friend').get((req, res) => {
    const friend = req.query.friend;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // TODO :  친구 이름 말고 id를 받아와서 처리해야 중복데이터가 안 나올텐데..
            conn.query('select * from member where name = ?', [friend], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(result);
                    res.send(result);
                }
            })
        }
    })
});

// 채팅방에 친구 추가
router.route('/chatuser/add').post((req, res) => {
    console.log(req.body);
    const friendId = req.body.friendid;
    const roomid = req.body.id;
    console.log('where is this?');
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // TODO : memberid로 select 한 멤버로 roommems에서 멤버 넣어줄거임
            // INSERT INTO 테이블명 SELECT 값1,값2 FROM DUAL WHERE EXISTS(SELECT a FROM 테이블명 WHERE 조건)
            conn.query('select * from member where id = ?', [friendId], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('success select');
                    // res.send(result);
                    conn.query('insert into roommems(memberid, roomid) values (?, ?)', [result[0].id, roomid], (err, result2) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log('success insert');
                            res.send(result);
                        }
                    })
                }
            })
        }
    })
});

// 현재 채팅방 유저
router.route('/chatuser/now').get((req, res) => {
    console.log(req.query.roomid);
    console.log('749');
    const roomid = req.query.roomid;
    console.log('where is this?');
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // 현재 방 user id 꺼내옴
            conn.query('select memberid from roommems where roomid = ?', [roomid], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    // res.send(result);
                    let add = "";
                    console.log(result.length);
                    
                    let test = "";
                    for (let i = 0; i < result.length; i++) {
                        let sql1 = 'select * from member where id=?; ';
                        let sql1s = mysql.format(sql1, result[i].memberid);
                        add += sql1s; 
                    }
                    conn.query(add, (err, result2) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            res.send(result2);
                        }
                    })
                    // res.send(test);
                }
            })
        }
    })
});

module.exports = router