const express = require('express');
const Member = require('../models/Member')
const Post = require('../models/Post')
const Friend = require('../models/Friend');
const { Op } = require("sequelize");

const mysql = require('mysql');
const config = require('../config/config.json').development;
const { sequelize } = require('../models/Member');
const pool = mysql.createPool(config);


const router = express.Router()

router.get('/main', async (req, res, next) => {
    try {
        
        const member = await Member.findAll({
            attributes : ['email', 'name', 'img'],
            where : {
                id : req.query.id
            }
        });
        

        const postCnt = await Post.count({
            where : {
                memberId : req.query.id
            }
        });
        console.log(postCnt);
        
        const friendCnt = await Friend.count({
            where: { 
                memberId: req.query.id
             },
        });
        
        const friendInform = await Member.findAll({
            attributes : ['id', 'img', 'name'],
            where : {
                id : {
                    [Op.in] : sequelize.literal(`(
                        select f.friendId from member as m join friend as f on m.id = f.memberId where m.id = `+ req.query.id +`
                    )`)
                }
            }
        });
        
        let array = [{member : member}, {postCnt : postCnt}, {friendCnt : friendCnt}, {friendInform : friendInform}];
        console.log(array);
        res.status(200).json(array)
    } catch (err) { 
        console.error(err);
        next(err);
    }
})

// 메인페이지 게시글 부분
router.route('/main/post').get((req, res) => {
    const id = req.query.idx;
    if (pool) {
        mainPost(id, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.end();
    }
})

// 메인페이지 채팅부분
router.route('/main/chat').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        mainChat(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.end();
    }
});

// 메인페이지 위치부분
router.route('/main/place').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        mainPlace(idx, (err, result) => {
            if (err) {
                res.writeHead('200', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>');
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        console.log('pool이 없대욥');
        res.end();
    }
});

// 친구 목록
router.route('/main/friend/list').get((req, res) => {
    const idx = req.query.idx;
    if (pool) {
        friendList(idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.end();
    }
})

// 친구 추가용 검색
router.route('/main/friend').post((req, res) => {
    console.log(req.body.idx)
    console.log(req.body.code)
    const invitationCode = req.body.code;
    const idx = req.body.idx;
    if (pool) {
        invitation(invitationCode, idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.end();
    }
});

// 친구 추가
router.route('/main/insert_friend').post((req, res) => {
    const fIdx = req.body.fIdx;
    const idx = req.body.idx;
    if (pool) {
        insertFriend(fIdx, idx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

// 채팅방 만들기
router.route('/main/insert_chat_room').get((req,res)=>{
    const senderIdx = req.query.senderIdx;
    const receiverIdx = req.query.receiverIdx;

    console.log(senderIdx,receiverIdx)

    if (pool) {
        insertRoom(senderIdx, receiverIdx, (err, result) => {
            if (err) {
                res.writeHead('201', { 'content-type': 'text/html; charset=utf8' });
                res.write('<h2>메인데이터 출력 실패 </h2>');
                res.write('<p>데이터가 안나옵니다.</p>')
                res.end();
            } else {
                res.send(result);
            }
        })
    }
})

const insertRoom = function(senderIdx, receiverIdx, callback) { 
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            conn.query('select m1.id from roommems m1 inner join roommems m2 on m2.roomId=m1.roomId where m1.memberId=? and m2.memberId=?',[senderIdx, receiverIdx], (err1, result1) => {
                if (err1) {
                    console.log(err1);
                    conn.release();
                } else {
                    if(Array.isArray(result1) && result1.length === 0){ // 두 멤버 채팅방 없을 경우
                        conn.query('insert into rooms(title) values (?)', ['채팅창']);
                        conn.release();
                        conn.query("SELECT AUTO_INCREMENT as auto FROM information_schema.tables WHERE table_name = 'rooms' AND table_schema = 'dzproject2nd'",(err2, result2)=>{
                            if(err2){
                                callback(err2, null);
                                console.log(err2);
                            }else{
                                console.log(result2);
                                console.log('create rooms!');
                                conn.query('insert into roommems(roomId, memberId) values (?,?)', [result2[0].auto, receiverIdx]);
                                conn.query('insert into roommems(roomId, memberId) values (?,?)', [result2[0].auto, senderIdx], (err3, result3)=>{
                                conn.release();
                                    if (err3) {
                                        callback(err3, null);
                                        console.log(err3);
                                        return;
                                    } else {
                                        callback(null, result2);
                                    }
                                })
                            }
                        })
                    }else{  // 두 멤버 채팅방 있을 경우
                        callback(null, 'false');
                        conn.release();
                    }
                }
            })
        }
    })
}


// 메인페이지 게시글
const mainPost = function (id, callback) {
    console.log(id);
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // conn.query('select i.imgName, count(i.imgName) as cnt, i.postIdx, p.createdAt from post as p join member as m on m.idx = p.memberIdx join img as i on p.idx = i.postIdx where p.memberIdx = ? group by i.postIdx;', [idx], (err, result) => {
                conn.query('select i.imgName, count(i.imgName) as cnt, i.postId from post as p join member as m on m.id = p.memberId join postimgs as i on p.id = i.postId where p.memberId = ? group by i.postId;', [id], (err, result) => {

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

// 메인페이지 채팅
const mainChat = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // 채팅 query문
            // select r.title, rm.memberIdx, m.img, m.name, (select content from chat where createdAt = (select max(createdAt) from chat where roomIdx = r.idx)) as chat from room_mem as rm join member as m on rm.memberIdx = m.idx join room as r on r.idx = rm.roomIdx where r.title in(select r.title from room_mem as rm join room as r on rm.idx = r.idx where rm.memberIdx = 1 group by r.title having rm.memberIdx != 1);
            conn.query('select r.title, rm.roomId, r.id, rm.memberId, m.img, m.name, (select content from chats where createdAt = (select max(createdAt) from chats where roomId = r.id)) as chat, (select max(createdAt) from chats where roomId = r.id) as time from roommems as rm join member as m on rm.memberId = m.id join rooms as r on r.id = rm.roomId where r.title in (select title from roommems as rm join rooms as r on rm.roomId = r.id where rm.memberId = ?) and m.id != ? group by title;', [idx, idx], (err, result) => {
                console.log(result);
                console.log('noonoonono');
                conn.release();
                if (err) {
                    callback(err, null);
                    console.log(err);
                    return;
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

// 메인페이지 위치
const mainPlace = function (idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            // 위치 query문
        }
    });
}

// 친구 목록
const friendList = function (idx, callback) {
    pool.getConnection((err, conn) => {
        console.log(conn);
        if (err) {
            console.log(err);
        } else {
            conn.query('select m.id, m.img, m.email, m.name, m.message from friend as f join member as m on m.id = f.friendId where f.memberId = ?;', [idx], (err, result) => {
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

// 친구 추가용 검색
const invitation = function (invitationCode, idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        } else {
            let flag = false;
            let fIdx = null;
            conn.query('select id, name, message, img, email from member where name = ?;', [invitationCode], (err, result1) => {
                if (result1 != "") {
                    fIdx = result1[0].id;
                }
                console.log('aa'+fIdx)
                console.log('bb'+idx)
                conn.query('select exists (select memberId from friend where memberId = ? and friendId = ? limit 1) as success;', [idx, fIdx], (err, result2) => {
                    if (result2[0].success == 1) flag = true;
                    console.log('flag'+flag)
                    console.log(result2[0].success)
                    conn.release();
                    if (err) {
                        callback(err, null);
                        return;
                    } else {
                        callback(null, { result1, flag });
                    }
                })

            });
        }
    });
}

// 친구 추가
const insertFriend = function (fIdx, idx, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err)
        } else {
            // TODO : createAt 설정 && 현재 상대방이 수락하는 방식이 아니라 친구추가하면 자동으로 반대쪽도 insert됨
            conn.query('select exists (select memberId from friend where memberId = ? and friendId = ? limit 1) as success;', [idx, fIdx], (err, result) => {
                console.log(result[0].success)
                console.log("친구추가")
                console.log(idx , fIdx)
                if(result[0].success == 1) {
                    conn.query('delete from friend where memberId = ? and friendId = ?', [idx, fIdx]);
                    conn.query('delete from friend where memberId = ? and friendId = ?', [fIdx, idx]);
                }else {
                    conn.query('insert into friend(memberId, friendId,createdAt,updatedAt) values(?, ?, \'2022-04-10\', \'2022-04-10\')', [idx, fIdx]);
                    conn.query('insert into friend(memberId, friendId,createdAt,updatedAt) values(?, ?, \'2022-04-10\', \'2022-04-10\')', [fIdx, idx]);
                }

                conn.release();
                if (err) {
                    callback(err, null)
                    console.log('select문 오류')
                    return;
                } else {
                    callback(null, true);
                }
            });
        }
    })
}

module.exports = router