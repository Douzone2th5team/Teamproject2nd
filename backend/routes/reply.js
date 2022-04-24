const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const bodyParser = require('body-parser');
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
const cors = require('cors');

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())  
router.use(cors({origin : 'http://localhost:3000', credentials : true, methods : "PUT,GET,POST,DELETE,OPTIONS,HEAD"}));

// 댓글 입력
router.route('/reply/insert_reply').post((req, res) => {
    // const idx = req.body.idx;   //null
    console.log(req.body);
    const id = req.body.id;   //null
    const groupIdx = req.body.groupIdx; //null
    const postIdx = req.body.postId;   //28
    const content = req.body.content; //댓글인데용
    const memberIdx = req.body.memberIdx;   //11
    const parentIdx = req.body.parentIdx;  

    
    if (pool) {
        // replyInsert(idx, groupIdx, postIdx, content, memberIdx, (err, result) => {
        replyInsert(postIdx, content, memberIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
});

// 댓글 입력
// const replyInsert = function (idx, groupIdx, postIdx, content, memberIdx, callback) {
// const replyInsert = function (id, groupId, postId, content, memberId, callback) {
const replyInsert = function (postId, content, memberId, callback) {
    pool.getConnection((err, conn) => {
        // 에러나면
        if (err) {
            
            console.log('test4');
            console.log(err)
        } else {
            
            console.log('test3');
            conn.query("insert into replys(postId, memberId, content) values(?,?,?)", [postId, memberId, content], (err, result) => {
                if (err) {
                    console.log('test2');
                    console.log(err);
                } else {
                    console.log('test');
                    console.log(result);
                    callback(null, true);
                }
            })
            // 안나면
            // if (groupIdx == undefined) {
            //     conn.query("SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE table_name = 'reply' AND table_schema = DATABASE();", (err, result) => {
            //         console.log("댓글시작11");
            //         // conn.query('insert into reply(postIdx, groupIdx, groupNum, depth, content, memberIdx, parentIdx) values(?, ?, 0, 0, ?, ?, ?);', [postIdx, result[0].auto, content, memberIdx, result[0].auto], (err, result) => {
            //         conn.query('insert into reply(postId, groupId, groupNum, depth, content, memberId, parentId) values(?, ?, 0, 0, ?, ?, ?);', [postId, result[0].auto, content, memberId, result[0].auto], (err, result) => {
            //             console.log("댓글시작22");
            //             conn.release();
            //             if (err) {
            //                 callback(err, null);
            //                 console.log(err)
            //                 console.log("댓글시작33");
            //                 return;
            //             } else {
            //                 callback(null, true);
            //                 console.log("댓글시작44");
            //             }
            //         });
            //     });
            // } else {
            //     console.log("댓글시작55");
            //     conn.query('select idx, groupIdx, groupNum, depth from reply where idx = ?', [idx], (err, result1) => {
            //         conn.query('select ifnull(MIN(groupNum),0) as cnt from reply where groupIdx = ? and groupNum > ? and depth >= ?;', [result1[0].groupIdx, result1[0].groupNum, result1[0].depth], (err, result2) => {
            //             console.log(result2[0].cnt)
            //             if (result2[0].cnt == 0) {
            //                 conn.query('select ifnull(max(groupNum),0)+1 as cnt from reply where groupIdx = ?', [result1[0].groupIdx], (err, result3) => {

            //                     conn.query('insert into reply(postIdx, groupIdx, groupNum, depth, content, memberIdx, parentIdx) values(?, ?, ?, ?, ?, ?, ?)', [postIdx, groupIdx, result3[0].cnt, result1[0].depth + 1, content, memberIdx, idx], (err, result) => {
            //                         conn.release();
            //                         if (err) {
            //                             callback(err, null);
            //                             return;
            //                         } else {
            //                             callback(null, true);
            //                         }
            //                     });
            //                 });
            //             } else {
            //                 conn.query('update reply set groupNum = groupNum +1 where groupIdx = ? and groupNum >= ?', [result1[0].groupIdx, result2[0].cnt], (err, result3) => {

            //                     conn.query('insert into reply(postIdx, groupIdx, groupNum, depth, content, memberIdx, parentIdx) values(?, ?, ?, ?, ?, ?, ?)', [postIdx, result1[0].groupIdx, result2[0].cnt, result1[0].depth + 1, content, memberIdx, idx]);
            //                     conn.release();
            //                     if (err) {
            //                         callback(err, null);
            //                         return;
            //                     } else {
            //                         callback(null, true);
            //                     }
            //                 });
            //             }
            //         });
            //     });
            // }
        }
    });
}

// 댓글 삭제
router.route('/reply/delete_reply').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        replyDelete(idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    }
})


// 댓글 삭제
const replyDelete = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            console.log(idx);
            conn.query('delete from replys where id = ?', [idx]);
            conn.release();
            if (err) {
                callback(err, null);
                return;
            } else {
                callback(null, true);
            }
            // conn.query('select EXISTS (select id from replys where parentId = ? limit 1) as success;', [idx], (err, result) => {
            //     if (err) {
            //         console.log(err);
            //     }

            //     if (result[0].success == 1) {
            //         conn.query('update reply set memberId = ?, content = ? where id = ?', [null, '삭제된 댓글입니다.', idx]);
            //     } else if (result[0].success == 0) {
            //         conn.query('delete from reply where id = ?', [idx]);
            //     }
            //     conn.release();
            //     if (err) {
            //         callback(err, null);
            //         return;
            //     } else {
            //         callback(null, true);
            //     }
            // })
        }
    })
}

module.exports = router