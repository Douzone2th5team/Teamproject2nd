import React from "react";
import { Link } from "react-router-dom";
import {Findidpw} from "./pageStyleBasic"

const FinFindidpw = () => {

    return (
        <Findidpw>
        <div className="body">
            <div className="topNum">
                {/* <img src="img/loginback.jpg"></img> */}
            </div>
            <div className="findtopnav">
                <p>💻</p>
                <h3>임시 비밀번호를 전송하였습니다.<br></br>
                    전송받은 임시 비밀번호로 로그인 해주세요.
                </h3>
            </div>
            <div className="finfind">
                <Link to="/"><button>로그인</button></Link>
            </div>
        </div>
        </Findidpw>
    )
}
    
export default FinFindidpw;