import React, { useState, useEffect, Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import {Login} from "./styledBasic";

let emailDisable = false;
let passwordDisable = false;

const LoginPage = () => {

    const formRef = React.createRef();
    function onSubmit(event){ }

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")

    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly2 = (display2) => {
        setDisplay2(display2)
    }

    const checkEmail = (e) => {
        e.preventDefault();
        const inputId = e.target.value;
        setEmail(inputId);
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()
    }

    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        e.preventDefault();
        const inputPw = e.target.value;
        setPassword(inputPw);
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            passwordDisable = false
        } else {
            changeDispaly2("none")
            passwordDisable = true
        }
        idDisabled()
    }

    const [disabled, setDisabled] = React.useState('disabled');

    const idDisabled = () => {
        if (emailDisable === true && passwordDisable === true) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }

    const onClickLogin = async(e) => {
        e.preventDefault();
        await axios.post(
            'http://localhost:3001/login',
            {
                email: email,
                userPw: password
            },
            { withCredentials: true }
        )
            .then((res, req) => {
                // 작업 완료 되면 페이지 이동(새로고침)
                if(res.data == null){
                    alert("아이디와 패스워드가 일치하지 않습니다.");
                }else{
                    document.location.href = `/main?idx=${res.data}`
                }
            })
    }

    return (
        <Login style={{height:1080, backgroundImage:`url(/front/public/img/loginback.gif)`}}>
            <div className="body">
                <div className="logo">
                    <img src="img/Logo_icon.png" alt="hi"></img>
                </div>
                <div>
                    <form className="Login" ref={formRef} onSubmit={onSubmit}>
                        <div className="login_top">
                            {/* 이메일 인풋창 */}
                            <p className='login-text'>이메일</p>
                            <div className="forheigth">
                                <input id="email" onChange={checkEmail} placeholder="이메일을 입력해주세요." />
                                <p className="red" style={{ display: display }}>* 이메일 양식을 확인해주세요.</p>
                            </div>
                            {/* 비밀번호 인풋 */}
                            <p className='login-text'>비밀번호</p>
                            <div className="forheigth">
                                <input id="pw" onChange={checkPassword} placeholder="비밀번호를 입력해주세요." type="password" />
                                <p className="red" style={{ display: display2 }}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                            </div>
                        </div>

                        <div className="login_btn_box">
                            {/* 로그인버튼 , 회원가입버튼*/}
                            <button className="login_btn1" type="button" disabled={disabled} onClick={onClickLogin} >로그인</button>
                        </div>

                        <div className="login_btn2">
                            <Link to="/Regist1">
                                <button className="signup">
                                    회원가입
                                </button>
                            </Link>

                            <Link Link to="/FindIdPw">
                                <button className="find">이메일/비밀번호 찾기</button>
                            </Link>
                        </div>
                        {/* 회원가입 버튼 클릭 -> /signup페이지로 이동 */}
                    </form>
                </div>
            </div>
        </Login>
    )
}
export default LoginPage;