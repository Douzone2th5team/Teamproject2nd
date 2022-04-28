import React, { useState, useEffect } from "react";
import Header from "../UserComponents/header";
import { Link } from "react-router-dom";
import axios from "axios";
import {MyPageQnAListWrap} from "./pageStyleBasic"
import {Cookies} from "react-cookie";

const cookies = new Cookies();
const cookie = cookies.get('three');
const MyPageQnAList = () =>{
    
    const[info, setInfo] = useState([]);

    // axios 뿌리기
    const [listAxios, setAxios] = useState(0); // list-useEffect axios의 값 존재 여부 저장
    let [question, setQuestion] = useState([]);
    let [pageNum, setPageNum] = useState(1);
    let [change, setChange] = useState(1);

    let pages = [];

    const Pagination = (page) =>{ 
        setPageNum(page)
        if(change === 1){ setChange(0) }else{ setChange(1) } } // useEffect 재실행을 위해 change값을 변경

    const PaginationNum = (e) =>{
        let pageNum = e.target.id
        Pagination(pageNum)
    }

    const PaginationArr = (e) =>{
        let pageArr = e.target.value
        Pagination(pageArr)
    }

    const curr = (e)=>{
        const cntCurr = e.split(' ')
        return cntCurr[0]
    }
    async function getinquirylist () {
        const question = await axios.get("http://localhost:3001/member/inquirylist?idx="+cookie);
        console.log(question.data);
        console.log(question.data[0]);
        setQuestion(question.data);
        if(!question.data[0]){ setAxios(1) } // axios의 값 존재 여부 저장
      }
    useEffect(() => {
      
      getinquirylist();
    }, []);

    for(let i = question.startPage; i <= question.endPage; i++) { 
      pages[i] = i
     }

    // 프로필정보 불러오기
    // TOOD : error 발생중
    useEffect(() => {
      async function getinfo () {
        const result = await axios.get(`http://localhost:3001/member/imgandname?idx=${cookie}`)
        setInfo(result.data[0])
      }
      getinfo()
  }, []);

    

    return (
        <>
            <Header/>
            <MyPageQnAListWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage"><li className="menuLink">프로필 편집</li></Link>
                            <Link to="/mypagePw"><li className="menuLink">비밀번호 변경</li></Link>
                            <Link to="/mypageQnAList"><li className="menuLink on">문의내역</li></Link>
                            <Link to="/mypageQnA"><li className="menuLink">문의하기</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <h1>신고/문의내역</h1>
                        <table align="center" width="50%">
                            <thead>
                            <tr>
                                <th width="12%">처리</th>
                                <th width="18%">문의유형</th>
                                <th width="50%">문의제목</th>
                                <th width="20%">작성일</th>
                            </tr>
                            </thead>
                            <tbody></tbody>
                            {question ?
                            question.map(rowData => (
                            <tr>
                                <td>{rowData.type}</td>
                                <td>{rowData.title}</td>
                                <td>{rowData.content}</td>
                                <td>{rowData.createdAt}</td>
                            </tr>
                            )):<tr className="nonData"><td colSpan="5">작성된 문의사항이 없습니다</td></tr> // member의 데이터가 없으면 나타냄
                            }
                        </table>
                    </div>
                </div>
            </MyPageQnAListWrap>
        </>
    );
}

export default MyPageQnAList;