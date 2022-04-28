import React, {useState, useEffect, Component} from "react";
import {Link, BrowserRouter as Router} from "react-router-dom";
import '../../src/app.css';
import axios from 'axios';
import {Login} from "./pageStyleBasic";

let emailDisable = false;
let passwordDisable = false;
let nameDisable = false;
let hpDisable = false;


const LoginPage = () => {

    const formRef = React.createRef();

    //이메일, 비밀번호 확인
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")
    const [display3, setDisplay3] = useState("none");
    const [display4, setDisplay4] = useState("none");
    const [displayLogin, setDisplayLogin] = useState("block")
    const [displayRegist, setDisplayRegist] = useState("none")
    const [selectedLogin, setSelectedFormLogin] = useState("selected-login")
    const [selectedRegist, setSelectedFormRegist] = useState("registFrom")
    const [name, setName] = React.useState('')
    const [hp, setHp] = React.useState('')

    const [random, setRandom] = useState(''); // 랜덤코드 저장

    const changeDisplay = (display) => {
        setDisplay(display)
    }
    const changeDisplay2 = (display2) => {
        setDisplay2(display2)
    }
    const changeDispaly3 = (display3) => {
        setDisplay3(display3)
    }
    const changeDispaly4 = (display4) => {
        setDisplay4(display4)
    }
    const changeDisplayLogin = (displayLogin) => {
        setDisplayLogin(displayLogin)
    }
    const changeDisplayRegist = (displayRegist) => {
        setDisplayRegist(displayRegist)
    }
    const selectedFormLogin = (selectedLogin) => {
        setSelectedFormLogin(selectedLogin)
    }
    const selectedFormRegist = (selectedRegist) => {
        setSelectedFormRegist(selectedRegist)
    }

    const changeFormLogin = (e) => {
        e.preventDefault();
        if (displayLogin == "none") {
            changeDisplayLogin("block")
            changeDisplayRegist("none")
            selectedFormLogin("selected-login")
            selectedFormRegist("registFrom")
        }
    }
    const changeFormRegist = (e) => {
        e.preventDefault();
        if (displayRegist == "none") {
            changeDisplayLogin("none")
            changeDisplayRegist("block")
            selectedFormLogin("loginFrom")
            selectedFormRegist("selected-login")
        }
    }

    const checkEmail = (e) => {
        e.preventDefault();
        const inputId = e.target.value;
        setEmail(inputId);
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        if (regExp.test(e.target.value) === false) {
            changeDisplay("block")
            emailDisable = false
        } else {
            changeDisplay("none")
            emailDisable = true
        }
        idDisabled1()
        idDisabled2()
    }

    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        e.preventDefault();
        const inputPw = e.target.value;
        setPassword(inputPw);
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (regExp.test(e.target.value) === false) {
            changeDisplay2("block")
            passwordDisable = false
        } else {
            changeDisplay2("none")
            passwordDisable = true
        }
        idDisabled1()
        idDisabled2()
    }

    const [disabled1, setDisabled1] = React.useState('disabled');

    const idDisabled1 = () => {
        if (emailDisable === true && passwordDisable === true) {
            setDisabled1('');
        } else {
            setDisabled1('disabled');
        }
    }

    const [disabled2, setDisabled2] = React.useState('disabled');
    const idDisabled2 = () => {
        if (emailDisable === true && passwordDisable === true && nameDisable === true && hpDisable === true) {
            setDisabled2('');
        } else {
            setDisabled2('disabled');
        }
    }

    useEffect(() => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 6
        let randomstring = ''
        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length)
            randomstring += chars.substring(rnum, rnum + 1)
        }
        setRandom(randomstring);
    }, [])

    //한글이름 유효성 검사
    const checkName = (e) => {
        e.preventDefault();
        var regExp = /^[가-힣]{2,15}$/;
        const pwV = e.target.value;
        setName(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly3("block")
            nameDisable = false
        } else {
            changeDispaly3("none")
            nameDisable = true
        }
        idDisabled2()
    }

    //핸드폰 번호 유효성 검사
    const checkPh = (e) => {
        e.preventDefault();
        var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        const pwV = e.target.value;
        setHp(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled2()
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickLogin(e);
        }
    }

    const onClickGoolgeLogin = async (e) => {
        e.preventDefault();
        await axios.get(
            'http://localhost:3001/member/googleLogin'
        )
    }

    const onClickLogin = async (e) => {
        e.preventDefault();
        await axios.post(
            'http://localhost:3001/member/login',
            {
                email: email,
                userPw: password
            },
            {withCredentials: true}
        )
            .then((res, req) => {
                // 작업 완료 되면 페이지 이동(새로고침)
                console.log(!!res.data)
                if (!!res.data == false) {
                    alert("일치하는 회원정보가 없습니다.");
                } else {
                    console.log('ssibla'+res.data);
                    document.location.href = `/main?idx=${res.data}`
                }
            })
    }

    // axios 제출
    const onClickRegist = async (e) => {
        e.preventDefault();
        // const gen =  document.querySelector("input[name='gender']:checked");
        console.log(email)

        await axios.post(
            `http://localhost:3001/member/regist`,
            {
                email: email,
                userPw: password,
                name: name,
                tel: hp,
                code: random,
            },
            {withCredentials: true}
        )
            .then(log => {
                if (log.data === true) {
                    alert('회원가입이 완료되었습니다. 로그인 페이지에서 로그인 해주세요!')
                    window.location.href = "/"
                } else {
                    alert('올바르지 않거나 중복된 정보입니다. 다시 입력해 주세요!')
                }
            });
    }


    return (
        <Login>
            <div className="container">
                <div id="slider-intro">
                    <div className="roket-container">
                        <div className="wing-left"></div>
                        <div className="wing-right"></div>
                        <div className="tail"></div>
                        <div className="capsule">
                            <div className="top">
                                <div className="shadow"></div>
                            </div>
                            <div className="base"></div>
                        </div>
                        <div className="window-big"></div>
                        <div className="window-small"></div>

                        <div className="fire-1"></div>
                        <div className="fire-2"></div>
                        <div className="fire-3"></div>
                        <div className="fire-4"></div>

                        <div className="spark-1"></div>
                        <div className="spark-2"></div>
                        <div className="spark-3"></div>
                        <div className="spark-4"></div>
                        <div className="star star-1"></div>
                        <div className="star star-2"></div>
                        <div className="star star-3"></div>
                        <div className="star star-4"></div>
                        <div className="star star-5"></div>
                        <div className="star star-6"></div>
                        <div className="star star-7"></div>
                        <div className="star star-8"></div>
                        <div className="star star-9"></div>
                        <div className="star star-10"></div>
                        <div className="star star-11"></div>
                        <div className="star star-12"></div>
                        <div className="star star-13"></div>
                        <div className="star star-14"></div>
                        <div className="star star-15"></div>
                        <div className="star star-16"></div>
                        <div className="star star-17"></div>
                        <div className="star star-18"></div>
                        <div className="star star-19"></div>
                        <div className="star star-20"></div>
                    </div>
                </div>
                <div className="user-forms">
                    <div className="centered-container">
                        <h2 id="select-form">
                            <span className={selectedLogin} onClick={changeFormLogin}>User Login</span> or <span
                            className={selectedRegist} onClick={changeFormRegist}>User Registration</span>
                        </h2>
                        <div className="user-login user-form" style={{display: displayLogin}}>
                            <form id="user-login" onKeyDown={handleKeyPress}>
                                <br/>
                                <label htmlFor="user-name">Email</label>
                                <input type="text" id="user-name" onChange={checkEmail} placeholder="이메일을 입력해주세요."/>
                                <p className="red" style={{display: display}}>* 이메일 양식을 확인해주세요.</p><br/>
                                <label htmlFor="user-pass">Password</label>
                                <input type="password" id="user-pass" onChange={checkPassword}
                                       placeholder="비밀번호를 입력해주세요."/>
                                <p className="red" style={{display: display2}}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p>
                                <br/><br/>
                                <button className="submit-btn" type="submit" disabled={disabled1}
                                        onClick={onClickLogin}>로그인
                                </button>
                                <button className="submit-btn" onClick={onClickGoolgeLogin}>구글 로그인</button>
                                <br/><br/>
                                <Link Link to="/FindIdPw">
                                    <a href="#" className="misc-links">Forgot Password?</a>
                                </Link>
                                <br/>
                            </form>
                        </div>
                        <div className="user-regist user-form" style={{display: displayRegist}}>
                            <form id="user-regist" ref={formRef}>
                                <br/>
                                <label htmlFor="regist-email">Email</label>
                                <input type="email" id="regist-email" onChange={checkEmail} placeholder="이메일을 입력해주세요."/>
                                <p className="red" style={{display: display}}>* 이메일 양식을 확인해주세요.</p><br/>
                                <label htmlFor="regist-pass">Password</label>
                                <input type="password" id="regist-pass" onChange={checkPassword}
                                       placeholder="비밀번호를 입력해주세요."/>
                                <p className="red" style={{display: display2}}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</p><br/>
                                <label htmlFor="regist-name">Name</label>
                                <input type="text" id="regist-name" onChange={checkName} placeholder="이름을 입력해주세요."/>
                                <p className="red" style={{display: display3}}>* 한글 2글자 이상 입력해주세요.</p><br/>
                                <label htmlFor="regist-pass">Phone</label>
                                <input type="text" id="regist-usr" onChange={checkPh} placeholder="휴대폰번호를 입력해주세요."/>
                                <p className="red" style={{display: display4}}>* 전화번호를 다시 입력해 주세요. ('-'제외)</p><br/>
                                <input type="checkbox" id="understood-terms"/>
                                <label htmlFor="understood-terms" className="inline-label">I understood and agree with
                                    the terms and conditions.</label>
                                <br/><br/>
                                <button className="submit-btn" onClick={onClickRegist} disabled={disabled2}>회원가입
                                </button>
                                <br/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Login>
    )
}
export default LoginPage;