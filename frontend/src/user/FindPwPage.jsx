import React, { useState } from "react";
import axios from 'axios';
import {Findidpwcss2} from "./pageStyleBasic"

let emailDisable = false;
let hpDisable = false;

const Findidpw2 = () => {
    const formRef = React.createRef();
    //휴대전화번호, 이메일저장
    const [hp,setHp] = React.useState('')
    const [email, setEmail] = React.useState('')
    //에러메세지 토글
    const [display ,setDisplay] = useState("none")
    const [display4 ,setDisplay4] = useState("none")
    const changeDispaly = (display) => { setDisplay(display) }
    const changeDispaly4 = (display4) => { setDisplay4(display4) }

    const checkEmail = (e) => {
        e.preventDefault();
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        const emailV = e.target.value;
        setEmail(emailV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()
    }
    const checkPh = (e) => {
        e.preventDefault();
        var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        const phV = e.target.value;
        setHp(phV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled()
    }
    
    //axios
    const makeRanCode = async (e) => {
        e.preventDefault();
        await axios({
            method: "post",
            url:`http://localhost:3001/member/findPassword`,
            data: {
                tel: hp,
                email: email
            }
        }).then((res)=>{
            window.location.href="/FinFindidpw/"
        })
    }

    let to_val = '';
    const [disabled, setDisabled ] = useState('disabled');
    const idDisabled = () => {
        if(emailDisable===true&&hpDisable===true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }

    return (
        <Findidpwcss2>
            <div className="body">
                <div className="findtopnav">
                    <h2> 👀비밀번호 찾기👀 </h2>
                    <h3>가입 시 등록한 휴대폰 번호와 이메일을 입력하시면, 이메일로 임시 비밀번호를 전송해드립니다.</h3>
                </div>
                <form className="findemail" ref={formRef}>
                    <input id="ranpw" name="ran_pw" value={to_val} type="hidden"></input>
                    <div className="tofind">
                        <p className="fixp">휴대폰 번호</p>
                        <div className="phinput forheigth">
                            <input id="ph" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요." />
                            <p className="red" style={{ display: display4 }}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p>
                        </div>
                        <p className="fixp">이메일 주소</p>
                        <div className="phinput forheigth">
                            <input type="email" id="email" name="user_email" onChange={checkEmail} placeholder="이메일을 입력해주세요." />
                            <p className="red" style={{ display: display }}>* 이메일 양식을 확인해주세요.</p>
                        </div>
                    </div>
                    <div className="finregi">
                        <button type="submit" value="Send" onClick={makeRanCode} disabled={disabled}>비밀번호 찾기</button>
                    </div>
                </form>
            </div>
        </Findidpwcss2>
    );
}
    
export default Findidpw2;