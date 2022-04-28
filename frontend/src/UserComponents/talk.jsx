import React, {useEffect, useRef, useState} from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"; // chat-ui-kit-style임
import io from 'socket.io-client';
import axios from 'axios';
// import './talkStyle.scss';
import TalkStyle from './talkStyle';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  ConversationHeader,
  Avatar,
  AddUserButton,
  MessageSeparator
} from "@chatscope/chat-ui-kit-react"; // chat-ui-kit library사용

let socket;

const Talk = ({current, loginIdx}) => {
  const [messageInputValue, setMessageInputValue] = useState("");

  const [profileimg, setImg] = useState('');
  const [name, setName] = useState('');
  const [id, setIdx] = useState('');
  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [addOn, setAddOn] = useState(true);

  const [modalOn, setModalOn] = useState(false);
  const [changeFriend, setChangeFriend] = useState(0);
  let [friend, setFriend] = useState();
  let [friendsList, setFriendsList] = useState([]);
  let [respondent, setRespondent] = useState();
  let [decFriend, setDecFriend] = useState();

  const ENDPORT = 'localhost:3001';
  const cookie = document.cookie.substring(6);
  
  const searchElement = useRef(null); // DOM 요소를 searchElement에 할당


  useEffect(() => {
    console.log('current뽑기',current);
    // current 에서 받은 데이터 저장, 순서 맞추기
    console.log(loginIdx);
    async function nowuser() {
        const test = await axios.get('http://localhost:3001/chatuser?id='+loginIdx);
        console.log(test);
        console.log(test.data[0]);
        // img를 message 쿼리에서 가져오도록 해야할듯?
        const {img, name} = test.data[0];
        if(img===null || img===''){
            setImg('img/blank_profile.png');
        } else setImg(img);
        setMessage(test.data[0].message);
        setName(name);
        
        console.log('it work2?');
    }
    nowuser();
    const {id, title} = current;
    console.log(current);
    setTitle(title);
    setIdx(id);
    console.log('it work?');
    socket = io.connect(ENDPORT);
    console.log(id);
    socket.emit('joinRoom', id, cookie);   // {idx:idx, name:name}
    console.log(`${title} 방 입장`)

     // textarea focus 할당
    if (searchElement.current) { // 할당한 DOM 요소가 불러지면 (마운트 되면)
        searchElement.current.focus(); // textarea에 focus 할당!
    }
    console.log('로그인Idx',loginIdx);
}, [current]);

    // 백에서 받아온 messase 처리
    useEffect(() => {
        socket.on('send', function (msg) {
            console.log(msg);
                if (msg.length > 1) { // 이전 대화내용
                    setMessages([...messages, ...msg]);
                    console.log('here?');
                } else { // 현재 보낸 메시지
                    // TODO 처음 입력했을 때랑 length2이상일때 입력했을 경우 비교해서 조건문걸기
                console.log(msg);
                msg.img = profileimg;
                setMessages([...messages, msg]);
                console.log('or here?');
                }
            })
    }, [messages]);


  // sendBtn message
  const sendMsg = (event)=>{
      console.log(event.target.innerText);
    event.preventDefault();
    const data = event.target.innerText;
    console.log(data);
    console.log(messageInputValue);
    console.log(setMessageInputValue);
    if(data!==''){
        const output = {idx:id, memberId: loginIdx, name:name, commend:'chat', type:'text', data:data, roomName : title};
        if(socket == undefined){
            alert('서버에 연결되지 않았습니다. 서버를 연결하세요');
            return;
        }
        socket.emit('message', output);
        if (searchElement.current) { // 할당한 DOM 요소가 불러지면 (마운트 되면)
            setMessageInputValue("");
            searchElement.current.value='';
            searchElement.current.focus();
        }
    }
}

useEffect(() => {
    async function getlist() {
    console.log(friend);
      const list = await axios.get(`http://localhost:3001/chatuser/friend?friend=${friend}`);
      console.log(list);
      console.log(list.data);
      console.log(list.data[0]);
      setFriendsList(list.data);
    }
    getlist()
  }, [changeFriend]);

      
    // 친구 초대 모달 창
    const Modal = () => {
        return(
            <div id="mw_temp" className="mw">
                <button className="closeBtn" onClick={onOpenModal}><i style={{color:'#6ea9d7', width:'30px', height:'30px', cursor:'pointer'}} className="fas fa-times fa-lg"></i></button>
                <div className="fg">
                    <p className="modalTitle">채팅 초대</p>
                    </div>
                    <div className="searchName"><input type="text" placeholder="초대할 친구 이름" id="decFriend"/><find onClick={searchBtn}><i style={{color:'#6ea9d7', }} className="fas fa-search fa-lg"></i></find></div>
                    <div className="findForm">
                        {friendsList.length!==0?
                        friendsList.map(friendData=>(
                            <>
                            <p><img src={friendData.img===null?"/"+friendData.img:'/img/none/noneImg.png'} className="friendImg" alt="친구리스트사진"/>
                            <div>
                            {friendData.name}
                            </div>
                            [ 
                                <span className="email" id={friendData.id+'@'+friendData.name}>
                                    {curr(friendData.email)}
                                </span>
                            ]</p>
                            <button className="cancel_btn" type="button" onClick={saveDecIdx}>초대하기</button>
                            </>
                        )):<></>
                        }

                </div>
            </div>
        )
    }

    const saveDecIdx =(e)=>{
        console.log(e.target.id);
        const curr = e.target.id.split('@');
        console.log(curr);
        const friendId = curr[0];

        async function addchatmember() {
            await axios({
                method: "post",
                url : 'http://localhost:3001/chatuser/add',
                data: {
                    friendid: friendId,
                    id: id
                }
            }).then(res => {
                console.log(res.data);
                setRespondent(curr[0]);
                setDecFriend(curr[1]);
                alert('친구가 초대되었습니다!');
                setModalOn(!modalOn);
            });
        }
        addchatmember();
    }

    const curr =(e)=>{
        const email = e.split('@');
        return email[0]
    }

    // 검색버튼 클릭
    const searchBtn = () =>{
        console.log('asdsad');
        let decFriend = document.getElementById('decFriend').value
        console.log(decFriend);
        console.log('how to list friend ')
        setFriend(decFriend)
        if(changeFriend===0){setChangeFriend(1)}else{setChangeFriend(0)}
    }

    // 친구초대 모달창
    const onOpenModal = (e) => {
        console.log('if click');
        if(changeFriend===0){setChangeFriend(1)}else{setChangeFriend(0)}
        setModalOn(!modalOn);
        //팝업 창 띄울 시 body 스크롤
        if(modalOn===false){
            document.body.style.overflow = "hidden";
        }else if(modalOn===true){
            document.body.style.boxShadow="rgba(0,0,0,0.5) 0 0 0 9999px";
            document.body.style.zIndex="100";
            document.body.style.overflow = "unset";
            setFriend()
        }
    }

    const closePop = () => {
        setAddOn(false);
        document.body.style.overflowY = "unset";
    }

  return (
      <>
          {addOn ? (
              <TalkStyle>
<div className="talkBox">
      <MainContainer responsive>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={profileimg}
              name="user"
            />
            <ConversationHeader.Content
              userName={name}
              info={message}
            />
            <ConversationHeader.Actions>
                {/* 친구추가, 메뉴, 나가기 */}
                <AddUserButton onClick={onOpenModal} />
            {/* <img src='img/friend.png' alt='친구추가' onClick={onOpenModal}></img> */}
            <button className="close" onClick={closePop}><i style={{color:'#6ea9d7', width:'30px', height:'30px', cursor:'pointer'}} className="fas fa-times fa-lg"></i></button>
              {/* <img src='img/close2.png' alt='나가기' ></img> */}
              {/* 친구추가 버튼 */}
              {/* 메뉴 버튼? 넣을지 말지 모름*/}
              {/* 나가기 버튼~ */}
            </ConversationHeader.Actions>
          </ConversationHeader>
          {/* messageList영역 */}
          <MessageList>
              
            <MessageSeparator content="2022-04-02 09:30" />
            {modalOn? <Modal/>: <></>}
            {/* Message태그가 direction으로 보낸이,받는이 구분하는듯?
            이거 쓸지 css 새로 만들지?  */}
            {messages.map((message, i)=>{
                                let isSentByCurrentUser = false;
                                console.log(message.memberId);
                                console.log(loginIdx);
                                if(message.memberId == loginIdx){
                                    isSentByCurrentUser = true;
                                }
                                return (
                                    isSentByCurrentUser ? (
                                    <div className='senderTalk'>
                                        <div className='talkDetailWrap'>
                                            <div className='STalkDetailList'>{message.data}</div>
                                        </div>
                                    </div>
                                    )
                                    : (
                                        <div className='reciverTalk'>
                                            <div className='talkProfileImgWrap'>
                                                {/* TODO : 본인 채팅 왼쪽, 상대방 채팅 오른쪽 삼항연산자 걸기*/}
                                                {/* { (message.img===null || message.img==='') :
                                                    message.img = 'img/blank_profile.png' ?
                                                    message.img } */}
                                                    { message.img === null || message.img === '' 
                                                    ? <img className='talkProfileImg' src='img/blank_profile.png' alt='프로필 사진'></img> 
                                                    : <img className='talkProfileImg' src={message.img} alt='프로필 사진'></img>
                                                    }
                                                {/* <img className='talkProfileImg' src={message.img} alt='프로필 사진'></img> */}
                                            </div>
                                            <div className='talkDetailWrap'>
                                                <div className='talkProfileName'>{message.name}</div>
                                                <div className='talkDetailList'>{message.data}</div>
                                            </div>
                                        </div>
                                    )
                                )
                            })}
            
          </MessageList>
          {/* message send영역, 파일첨부 display:none으로 변경 */}
          {/* <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => setMessageInputValue("")}
          /> */}
          {/* <div className='talkSendWrap'>
                <textarea ref={searchElement} className='talkTextInput' onKeyPress={event => event.key === 'Enter' ? sendMsg(event) : null}></textarea>
                <button className='talkSendBtn' onClick={sendMsg}>전송</button>
            </div> */}
          <MessageInput
            ref={searchElement} 
            onKeyPress={event => event.key === 'Enter' ? sendMsg(event) : null}
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={event => event.key === 'Enter' ? sendMsg(event) : null}
          />
        </ChatContainer>
      </MainContainer>
      </div>
      </TalkStyle>
          ): null}
          </>
  );
};

export default Talk;