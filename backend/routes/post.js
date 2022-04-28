const express = require('express');
const mysql = require('mysql');
const config = require('../config/config');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const { log } = require('console'); //?, 확인
// const pool = mysql.createPool(config);
const pool = mysql.createPool({
    "username": "admin_b",
    "user" : "admin_b",
    "password": "1234",
    "database": "dzproject2nd",
    "host": "kosa2.iptime.org",
    "port": "50332",
    "dialect": "mysql",
    "multipleStatements": "true" 
  });


const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))

// 업로드 저장방법
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 이미지 파일
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, 'C:/Users/shinjoongho/OneDrive/바탕 화면/react_practice/Us-main/frontend/public/uploads')
            //텍스트 파일
        } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
            cb(null, 'C:/Users/shinjoongho/OneDrive/바탕 화면/react_practice/Us-main/frontend/public/img/uploads')
        }
    },
    // 파일이름 설정
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

// 업로드
const upload = multer({ storage: storage })

// 게시글 등록
router.route('/post/upload').post(upload.array('fileupload', 10), (req, res) => {
    console.log("plzplz");
    const memberId = req.body.memberId;   //post table
    console.log(memberId);
    const content = req.body.content;   //post table
    console.log(content);
    const file = req.files;             //?
    console.log(file);
    console.log('findthis')

    if (pool) {
        postUpload(memberId, content, file, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                console.log(result);
                console.log('this?');
                res.send(result);
            }
        });
    }
});

// 게시글 등록
//memberIdx없는데 되는데? -> member.Id로 바꿈, 윤지
const postUpload = function (memberId, content, file, callback) {
 
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
                //post table
                conn.query('insert into post(memberId, content) values(?, ?)', [memberId, content], (err, result1) => {
                    if (err) {
                        // 에러나면
                        console.log(err);
                    } else {
                        //에러 안나면
                        console.log(result1);
                        console.log(result1.insertId);
                        for (let i = 0; i < file.length; i++) {
                            let fileName = file[i].filename;
                            let filePath = file[i].path;
                            let postId = result1.insertId; // 현재 postimgs ID
                            console.log(memberId); // TODO : 문제 생기면 이걸로 변경
                            conn.query('insert into postimgs(postId, imgPath, imgName) values(?, ?, ?)', [postId, filePath, fileName]);
                        }
                    conn.release();
                    } //end else
                // conn.query('insert into postimgs(postid, imgname, imgpath) values(?, ?, ?)', [memberId, content, file], (err, result1) => {
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    callback(null, true);
                }
            });
        }
    });
}

// 게시글 수정
router.route('/post/edit').post(upload.array('fileupload', 10), (req, res) => {
    // const idx = req.body.idx;
    const id = req.body.id; // 
    const content = req.body.content;   // 수정 팝업에서 작성한 content
    const file = req.files; //true x, 파일 경로

    if (pool) {
        // postEdit(idx, content, file, (err, result) => {
        postEdit(id, content, file, (err, result) => {
            if (err) {
                //에러나면
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
                console.log("updatetest");
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 수정
//idx를 id로 바꾸기
// const postEdit = function (idx, content, file, callback) {
const postEdit = function (id, content, file, callback) {
    pool.getConnection((err, conn) => {
        //에러나면
        if (err) {
            console.log(err);
        } else {
            if (file == "") {   //이미지가 없는 파일 
                // conn.query('update post set content = ? where idx = ?', [content, idx], (err, result1) => {
                conn.query('update post set content = ? where id = ?', [content, id], (err, result1) => {
                    conn.release();
                    //에러나면
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, true);
                    }
                });
            } else {    //이미지 파일이 있는 경우
                // select -> update -> select -> delete -> insert
                // conn.query('update post set content = ? where idx = ?', [content, idx], (err, result1) => {
                conn.query('update post set content = ? where id = ?', [content, id], (err, result1) => {
                    // conn.query('select imgName from PostImg where postIdx = ?', [idx], (err, result2) => {
                    // conn.query('select imgName from PostImg where postId = ?', [id], (err, result2) => {
                    conn.query('select imgName from postimgs where postId = ?', [id], (err, result2) => {
                        for (let i = 0; i < result2.length; i++) {
                            fs.unlink('C:/Users/jybeo/Desktop/us2/frontend/public/uploads/' + result2[i].imgName, (err) => {
                            });
                        }
                    });
                    // conn.query('delete from PostImg where postIdx = ?', [idx]);
                    // conn.query('delete from PostImg where postId = ?', [id]);
                    conn.query('delete from postimgs where postId = ?', [id]);
                    for (let i = 0; i < file.length; i++) {
                        let fileName = file[i].filename;
                        let filePath = file[i].path;
                        // conn.query('insert into img(postIdx, imgPath, imgName) values(?, ?, ?)', [idx, filePath, fileName])
                        conn.query('insert into postimgs(postId, imgPath, imgName) values(?, ?, ?)', [id, filePath, fileName], (err, test) => {
                            // conn.release();
                            console.log(test);
                            console.log('testhere222!!!');
                            if (err) {
                                callback(err, null);
                                return;
                            } else {
                                console.log(test);
                                callback(null, true);
                            }
                        })
                    }
                });
            }
        }
    });
}

// 게시글 삭제
router.route('/post/delete').get((req, res) => {
    // const idx = req.query.idx;  //post id값
    const id = req.query.id;  //post id값
    

    if (pool) {
        // postDelete(idx, (err, result) => {
        postDelete(id, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})

// 게시글 삭제
// const postDelete = function (idx, callback) {
const postDelete = function (id, callback) {
    pool.getConnection((err, conn) => {
        //에러나면 실행
        if (err) {
            console.log(err);
        } else {
            //에러 안남
            // conn.query('select imgName from img where postIdx = ?', [idx], (err, result) => {
            conn.query('select imgName from postimgs where postId = ?', [id], (err, result) => {
                for (let i = 0; i < result.length; i++) {
                    fs.unlink('uploads/images/' + result[i].imgName, (err) => {
                    });
                }
                // conn.query('delete from post where idx = ?', [idx], (err, result) => {
                conn.query('delete from post where id = ?', [id], (err, result) => {
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, true);
                    }
                })
            });
        }
    });
}

// 게시글 디테일
// 04.20 idx -> id
// 되는거 확인~ 04.20
router.route('/post/detail').get((req, res) => {
    const postId = req.query.postId;
    if (pool) {
            postDetail(postId, (err, result) => {
                //에러 나면
                if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 게시글 디테일
const postDetail = function(postId, callback){
    pool.getConnection((err, conn) => {
        if (err) {
        } else {
            const sql1 = 'select p.content, m.id, m.email, m.name, m.img from post as p join member as m on p.memberId = m.id where p.id = ?; ';
            const sql1s = mysql.format(sql1, postId);

            
            const sql2 = 'select imgName from postimgs where postId = ?; ';
            const sql2s = mysql.format(sql2, postId);

            conn.query(sql1s+sql2s, (err, result) => {
                console.log(result);
                console.log(err);
                conn.release();
                if (err) {
                    callback(err, null);
                    return;
                    
                } else {
                    callback(null, result);
                }
            });
        }
    }); //end pool
}

module.exports = router