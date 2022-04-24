import React, { useState } from "react";
import axios from "axios";
import {FindidpwStyled} from "./pageStyleBasic"

let hpDisable = false;
const Findidpw = () => {
    const formRef = React.createRef();
    //휴대폰번호 저장
    const [display4, setDisplay4] = useState("none")
    const [handp, setHandp] = React.useState('');

    //핸드폰번호 유효성 검사
    const changeDispaly4 = (display4) => { setDisplay4(display4) }

     //핸드폰번호 유효성 검사
    const checkPh = (e) => {
        e.preventDefault();
        const regExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
        const ph = e.target.value;
        setHandp(ph)
        if (!regExp.test(ph)) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled()
    }
    //버튼 활성화
    const [disabled, setDisabled ] = React.useState('disabled');
    const idDisabled = () => {
        if(hpDisable===true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }
    //axios
    const searchEmail = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url:`http://localhost:3001/member/findId`,
            data: {
                tel: handp
            }
        })
        .then(res => {
            if(res.data == false){
                alert("존재하지 않는 전화번호 입니다")
            }else{
                window.location.href="/SuchFindId/"+ res.data
            }
        })
    }
    return (
        <FindidpwStyled>
            <div className="body">
                <div className="findtopnav">
                    <div className=""><h2>👀 이메일 찾기 👀</h2></div>
                    <div className="findComment">
                    <h3>가입 시 등록한 휴대폰 번호를 입력하면
                        이메일 주소의 일부를 알려드립니다.</h3>
                    </div>
                </div>
                <form className="findemail" ref={formRef}>
                    <div className="ph">
                        <p>휴대폰 번호</p>
                        <div className="phinput forheigth">
                        <input autocomplete="off" value={handp} id="ph" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요."/>
                        <p className="red"  style={{display:display4}}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p>  
                        </div>
                    </div>
                    <div className="finregi">
                    <button className="activebtn" type="button" disabled={disabled} onClick={searchEmail}>이메일 찾기</button>
                    </div>    
                </form>
            </div>
        </FindidpwStyled>
    )
}
    
export default Findidpw;