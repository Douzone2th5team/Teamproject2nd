import React, {useEffect, useState} from "react";
import styled from "styled-components"; //css 사용할 때 import시켜줘야 함
import Talk from './talk';
import axios from 'axios';

// const TalkListWrap123 = styled.div`
//     max-width: 100%;
//     margin: 0 auto;
//     margin-bottom: 8rem;

//     * { font-size: 1.6rem; }

//     .talkProfileImg { width: 7rem; cursor: pointer; border-radius: 50%; border: 3px solid #423b422e; }
//     .talkList { overflow-y: scroll; padding: 2rem; padding-bottom: 0; max-height: 60rem; }
//     .talkItem{
//         background-color: black;
//     display: flex; padding: 1.5rem; border-bottom: 1px solid #c8c8c8; cursor:pointer; }
//     .talkItem:hover{ background-color: #efefef; }
//     .talkDetailWrap { margin-left: 2rem; max-width: 50%; margin-top: 1rem; }
//     .talkProfileName { margin-bottom: .5rem; font-weight: 600; }
//     .talkDetail { word-break : keep-all; white-space: nowrap; line-height: 2.5rem; color: white; height: 2.5rem; text-overflow: ellipsis; overflow: hidden; }
//     .talkRecord{ margin-top: 1.5rem; margin-left: auto; text-align: right; }
//     .talkDate{ color: white; }
//     .readCount{ color: #fff; background-color: #f44; border-radius: 50%; display: inline-block; padding: .5rem; line-height: 1rem; }
// `;

const TalkListWrap = styled.div`talkItemList
    .talkList { overflow-y: scroll; padding: 2rem; padding-bottom: 0; max-height: 60rem; }
`;

// 몇일전, 분, 시간, 일, 년 까지 구하는 함수
function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);
    const year = timeValue.getFullYear(); 
    const month = timeValue.getMonth() + 1; 
    const date = timeValue.getDate();
    const hour = timeValue.getHours();
    const minute = timeValue.getMinutes();
    let halfHour = '오전';

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {  return `${betweenTime}분전`; }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        if(hour>13) halfHour = '오후';
        return halfHour +' '+ timeValue.toTimeString().substring(0,5);
    }
    return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
}

const TalkList = (idx)=>{
    
    const [posts, setPosts] = useState({});
    const [current, setCurrent] = useState({});
    
    
    // 채팅창 팝업
    const[addOn, setAddOn] = useState(false);

    // 코드개판
    useEffect(() => {
        try{
            Promise.allSettled([
                axios.get(`http://localhost:3001/main/chat?idx=${idx.idx}`, {
                    validateStatus: function (status) {
                      return status < 500; // Resolve only if the status code is less than 500
                    }
                })
            ]).then((res) => {
                console.log(res);
                console.log('hahaha');
                setPosts(res[0].value.data);
                console.log(posts);
            })
        } catch(e){
            console.error(e.message)
        }
    },[])
    
    const onView = (roomIdx) => {
        setCurrent(posts.find(item => item.id === roomIdx))
        console.log(setCurrent(posts.find(item => item.id === roomIdx)));
        console.log(roomIdx);
        console.log(posts);
        console.log('이게 맞냐구');
    }

    const onTalkPop = () => {
        console.log(current);
        console.log('이게맞아?');
        setAddOn(!addOn);
        // 팝업 창 띄울 시 body 스크롤
        if(addOn===false){
            document.body.style.overflow = "hidden";
        }else if(addOn===true){
            document.body.style.overflow = "unset";
        }
    }

    // 조회 데이터 존재할 경우
    if(posts.length > 0) {
        return (
            <TalkListWrap>
                {addOn ? <Talk current={current} loginIdx={idx.idx}/> : ""}
                <div className='talkItemList'>
                {
                    posts.map(post => (
                        <a onClick={()=>{
                            onTalkPop();
                            onView(post.id);
                        }}>
                            <div className='talkItem' onContextMenu={(e) => {
                                e.preventDefault();
                            }}>
                                <div className='user'>
                                    <img className='user-img' src={post.img==null||post.img===''? "/img/blank_profile.png": "/"+post.img} alt='프로필 사진'></img>
                                
                                <div className='talkDetailWrap'>
                                <div className="user-status"></div>
                                    <div className='talkProfileName'>{post.name}</div>
                                    <div className='talkDetail'>{post.chat}</div>
                                    <div className='talkDate'>{post.time!==null?timeForToday(post.time):''}</div>
                                </div>
                                </div>
                            </div>
                        </a>
                    ))
                }
                </div>
            </TalkListWrap>
        )
        
    } 
    else { // 조회 데이터 존재하지 않을 경우
        return (
            <div style={{textAlign: "center", fontSize: "1.5rem", color: "Gray"}}>No Chat Room</div>
        )
    }
}

export default TalkList;