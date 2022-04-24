const express = require('express');
const config = require('./config/config.json').development;
const { sequelize } = require('./models');
const mysql = require('mysql');
const app = express();
const http = require('http').createServer(app);


const mainRouter = require('./routes/main.js');
const postRouter = require('./routes/post.js');
const memberRouter = require('./routes/member.js');
const replyRouter = require('./routes/reply.js');
const pool = mysql.createPool(config);


sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })


app.use(memberRouter);
app.use(mainRouter);
app.use(postRouter);
app.use(replyRouter);
// app.use(cookieParser());// 쿠기와 세션을 미들웨어로 등록

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true
    }
});

http.listen(3001, () => {
    console.log('3001번포트로 실행중');
});

io.sockets.on('connection', (socket) => {
    // 방 조인
    socket.on('joinRoom', (idx ,cookie) => {     // joinRoom을 클라이언트가 emit 했을 시    // ({idx, room})
        console.log(idx);
        console.log(cookie);
        
        socket.join(idx);    // 클라이언트를 msg에 적힌 room으로 참여 시킴
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                // 1. chats table 전부 가져옴 -> 2. memberid별로 img가 존재하는지 나눠서 출력
                conn.query('select c.id, c.name, c.content data, m.img, c.createdAt, c.memberId, c.roomId from chats as c join member m on m.id = c.memberId where c.roomid = ?;',[idx], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result.length === 0) {
                            return;
                        }
                        console.log(result);
                        console.log('gasibal');
                        socket.emit('send', result);
                    }
                })
            }
        })
    });
    // TODO : 1:N 대화 어캐할지?
    // 상대방한테 메시지 보이는지?
    socket.on('message', function (msg) {       // 클라이언트가 채팅 내용을 보냈을 시
        // 전달한 roomName에 존재하는 소켓 전부에게 broadcast라는 이벤트 emit
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                // mySQL datetime 형식에 맞춤
                let today = new Date();
                let year = today.getFullYear(); // 년도
                let month = today.getMonth() + 1;  // 월
                let date = today.getDate();  // 날짜
                let dateString = year+'-'+month+'-'+date;

                let hours = ('0' + today.getHours()).slice(-2); 
                let minutes = ('0' + today.getMinutes()).slice(-2);
                let seconds = ('0' + today.getSeconds()).slice(-2); 
                let timeString = hours + ':' + minutes  + ':' + seconds; // 현재 시간
                console.log(msg);
                console.log('현재대화');
                socket.emit('send', msg); // 현재 대화내용 전송
                conn.query('insert into chats(roomId, name, memberId, content, createdAt) values (?,?,?,?,?)', [msg.idx, msg.name, msg.memberId, msg.data, dateString+' '+timeString], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('======== success =====');
                    }
                })
            }
        })
    })

    socket.on('disconnect', () => {
        console.log('유저가 나갔습니다.');
     })
    });

