import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {FindId} from  "./pageStyleBasic"


const SuckFindId = () => {
    const email = useParams();
    return (
        <FindId>
            <div className="body">
                <div className="findtopnav">
                    <div className="topNum">
                        <h2>💻</h2>
                    </div>
                    <h1>회원님의 이메일 주소는 <br></br><span>{email.email}</span> 입니다.</h1>
                </div>
                <div className="twoBtn">
                    <Link to="/FindIdPw2">
                        <button className="twoKindBtn">
                            비밀번호 찾기
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="twoKindBtn2">
                            로그인
                        </button>
                    </Link>
                </div>
            </div>
        </FindId>
    )
}
    
export default SuckFindId;