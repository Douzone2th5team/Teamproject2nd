import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import { Link } from "react-router-dom";
import axios from "axios";

import {MyPageQnAWrap} from "./pageStyleBasic"
import {Cookies} from "react-cookie";


const cookies = new Cookies();
const cookie = cookies.get('three');

const MyPageQnA = () =>{
    const[info, setInfo] = useState([]);

    // 문의 유형,제목,내용
    let [type, setType] = useState("계정관리");
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');

    //팝업, 친구 목록, 이름 검색
    const [modalOn, setModalOn] = useState(false);
    const [changeFriend, setChangeFriend] = useState(0);
    let [friendsList, setFriendsList] = useState([]);
    let [friend, setFriend] = useState();

    //신고대상자 idx, name
    let [respondent, setRespondent] = useState();
    let [decFriend, setDecFriend] = useState();
    
    const selectType = (e) => { 
        setType(e.target.value);
        if(e.target.value!=='신고하기'){
            setRespondent()
            setDecFriend()
        }
    }
    const changeTitle = (e)=>{ setTitle(e.target.value); }
    const changeContent = (e)=>{ setContent(e.target.value); }

    // 검색 버튼 클릭 시
    const searchBtn = () =>{
        let decFriend = document.getElementById('decFriend').value
        setFriend(decFriend)
        if(changeFriend===0){setChangeFriend(1)}else{setChangeFriend(0)}
    }

    const onOpenModal = (e) => {
        if(changeFriend===0){setChangeFriend(1)}else{setChangeFriend(0)}
        setModalOn(!modalOn);
        //팝업 창 띄울 시 body 스크롤
        if(modalOn===false){
            document.body.style.overflow = "hidden";
        }else if(modalOn===true){
            document.body.style.overflow = "unset";
            setFriend()
        }
    }

    useEffect(() => {
      async function getinfo () {
        const result = await axios.get(`http://localhost:3001/member/imgandname?idx=${cookie}`)
        setInfo(result.data[0])
      }
      getinfo()
  }, []);

    // 친구목록 불러오기
    useEffect(() => {
      async function getlist() {
        const list = await axios.get(`http://localhost:3001/inquiry/friend?friend=${friend}`);
        setFriendsList(list.data);
      }
      getlist()
    }, [changeFriend]);

    // 문의하기 axios 제출
    const goRegist = async (e) => {
      console.log(e.target);
      console.log(content);
      // singo
      let test = document.getElementById('singo').value;
      console.log(test);
        await axios({
            method: "post",
            url:`http://localhost:3001/inquiry`,
            data: {
                memberIdx: cookie,
                title: title,
                content: content,
                type: type,
                respondent : respondent
            }
        }).then((log)=>{
            if(log.status===200){
              if (type === '신고하기') {
                alert('신고가 등록되었습니다.');
              } else if (type === '계정관리') {
                alert('계정관리 문의가 등록되었습니다.');
              }
            }else{
                alert('등록에 실패하였습니다.')
            }
            window.location.reload();                
        });
    }
    const curr =(e)=>{ 
        const email = e.split('@');
        return email[0]
    }

    const saveDecIdx =(e)=>{
        const curr = e.target.id.split('@');
        setRespondent(curr[0])
        setDecFriend(curr[1])
        setModalOn(!modalOn);
    }

    // 신고대상 찾기 팝업
    const Modal = () => {
        return(
            <div id="mw_temp" className="mw">
                <div className="bg"></div>
                <div className="fg">
                    <div className="closeBtn" onClick={onOpenModal}><i class="fas fa-times"></i></div>
                    <p className="modalTitle">신고대상 찾기</p>
                    <div className="searchName"><i class="far fa-angry"></i><input type="text" placeholder="신고대상자명을 입력하세요" id="decFriend"/><input type="button" value="검색" onClick={searchBtn}/></div>
                    <div className="findForm">
                        {friendsList.length!==0?
                        friendsList.map(friendData=>(
                            <p><img src={friendData.img!==null?"/"+friendData.img:'/img/none/noneImg.png'} className="friendImg" alt="친구리스트사진"/>{friendData.name} [ <span className="email" id={friendData.idx+'@'+friendData.name} onClick={saveDecIdx}>{curr(friendData.email)}</span> ]</p>
                        )):<></>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header/>
            <MyPageQnAWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink">프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink">비밀번호 변경</li></Link>
                            <Link to="/mypageQnAList"><li className="menuLink">문의내역</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink on">문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        { type !== "신고하기" ? 
                            <ul className="profileList">
                                <li className="profileItem proFirst">
                                    <h1>신고/문의하기</h1>
                                </li>
                                <li className="profileItem profileSelect firstItem">
                                    <div className="QnaTitle section1">문의유형</div><br/>
                                    <select name="category1" id="category1" onClick={selectType}>
                                        <option value="계정관리">계정관리</option>
                                        <option value="신고하기">신고하기</option>
                                    </select>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">문의명</div><br/>
                                    <div className="titleBox section2">
                                        <input type="text" name="title" id="title" placeholder="제목" onBlur={changeTitle}/>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">문의내용</div><br/>
                                    <div className="contentBox section2">
                                        <textarea type="text" name="content" id="content" placeholder="내용" onBlur={changeContent}/>
                                    </div>
                                </li>
                            </ul>
                            :
                            <ul className="profileList">
                                <li className="profileItem profileFirst">
                                    <h1>신고/문의하기</h1>
                                    <span className="red">* 신고사실은 신고대상자가 알지 못합니다.</span>
                                </li>
                                <li className="profileItem profileSelect firstItem">
                                    <div className="QnaTitle section1">문의유형</div><br/>
                                    <select name="category1" id="category1" onClick={selectType}>
                                        <option value="계정관리">계정관리</option>
                                        <option value="신고하기">신고하기</option>
                                    </select>
                                </li><></>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">신고대상</div><br/>
                                    <div className="titleBox section2">
                                        <input type="text" id="target" placeholder="신고대상" value={decFriend} readOnly/><span className="popup" onClick={onOpenModal}><i class="fas fa-search"></i></span>
                                        {modalOn? <Modal/>: ''}
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaTitle section1">신고유형</div><br/>
                                    <div className="titleBox section2">
                                        <input type="text" placeholder="신고유형" onBlur={changeTitle}/>
                                    </div>
                                </li>
                                <li className="profileItem profileSelect">
                                    <div className="QnaContent section1">신고이유</div><br/>
                                    <div className="contentBox section2">
                                        <textarea type="text" name="content" id="content" placeholder="신고하는 이유" onBlur={changeContent}/>
                                    </div>
                                </li>
                            </ul>
                        }
                        <div className="submitBtn">
                            <button type="submit" className="btn" id="singo" onClick={goRegist}> 제출 </button>
                        </div>
                    </div>
                </div>
            </MyPageQnAWrap>
        </>
    );
}

export default MyPageQnA;