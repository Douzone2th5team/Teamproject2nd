import React, {useState, useEffect} from "react";
import Header from "../UserComponents/header";
import {Link} from "react-router-dom";
import axios from "axios";
import {MyPagePwWrap} from "./pageStyleBasic"
import {Cookies} from "react-cookie";

// 버튼 활성화
let passwordDisable = false;
let passwordDisable2 = false;
let passwordDisable3 = false;

const cookies = new Cookies();
const cookie = cookies.get('three');

const MyPagePw = () => {
    const menuClick = () => {
    };

    const [info, setInfo] = useState([]); //멤버 정보 저장

    //비밀번호 확인
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');

    //유효성 검사
    const [isPassword, setIsPassword] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isPassword3, setIsPassword3] = useState(false);

    const [disabled, setDisabled] = useState('disabled'); // 버튼 disabled

    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/ //비밀번호 정규식

    //전 비밀번호 
    const passwordInput = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword(password);
        if (!regExp.test(password)) {
            setIsPassword(false);
            passwordDisable = false;
        } else {
            setIsPassword(true);
            passwordDisable = true;
        }
        idDisabled()
    }

    //새 비밀번호
    const passwordInput2 = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword2(password);
        if (!regExp.test(password)) {
            setIsPassword2(false);
            passwordDisable2 = false;
        } else {
            setIsPassword2(true);
            passwordDisable2 = true;
        }
        idDisabled()
    }

    //새 비밀번호 확인 
    const passwordInput3 = (e) => {
        e.preventDefault();
        const password3 = e.target.value;
        setPassword3(password3);
        if (password2 === password3) {
            passwordDisable3 = true;
            setIsPassword3(true);
        } else {
            passwordDisable3 = false;
            setIsPassword3(false);
        }
        idDisabled()
    }

    const idDisabled = () => {
        if (passwordDisable === true && passwordDisable2 === true && passwordDisable3 === true) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }

    // 프로필정보 불러오기
    useEffect(() => {
        async function getinfo() {
            const info = await axios.get(`http://localhost:3001/member/imgandname?idx=${cookie}`)
            setInfo(info.data[0]);
        }

        getinfo()
    }, []);

    //비밀번호 변경 제출
    const send = async () => {
        await axios({
            method: "post",
            url: `http://localhost:3001/member/ComparePassword`,
            data: {
                userPw: password,
                userPw2: password2,
                idx: cookie
            }
        })
            .then(log => {
                if (log.data === false) {
                    alert('이전 비밀번호를 확인해주세요.')
                } else {
                    alert("비밀번호가 변경되었습니다");
                }
                window.location.reload();
            })
    }

    return (
        <>
            <Header/>
            <MyPagePwWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage">
                                <li className="menuLink" onClick={menuClick}>프로필 편집</li>
                            </Link>
                            <Link to="/mypagePw">
                                <li className="menuLink on" onClick={menuClick}>비밀번호 변경</li>
                            </Link>
                            <Link to="/mypageQnAList">
                                <li className="menuLink" onClick={menuClick}>문의내역</li>
                            </Link>
                            <Link to="/mypageQnA">
                                <li className="menuLink" onClick={menuClick}>문의하기</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem">
                                <div className="section1">이전 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="currPw" id="currPw" placeholder="이전 비밀번호"
                                           onChange={passwordInput}/>
                                    <p className="red">{password.length > 0 &&
                                        <span className={`message ${isPassword ? 'success' : 'error'}`}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</span>}</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">새 비밀번호</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="newPw" id="newPw" placeholder="새 비밀번호"
                                           onChange={passwordInput2}/>
                                    <p className="red">{password2.length > 0 &&
                                        <span className={`message ${isPassword2 ? 'success' : 'error'}`}>* 영문,숫자,특수문자 포함 8자 이상 입력해주세요.</span>}</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">새 비밀번호 확인</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="confirmNewPw" id="confirmNewPw" placeholder="새 비밀번호 확인"
                                           onChange={passwordInput3}/>
                                    <p className="red">{password3.length > 0 &&
                                        <span className={`message ${isPassword3 ? 'success' : 'error'}`}>* 새 비밀번호가 일치하지 않습니다.</span>}</p>
                                </div>
                            </li>
                        </ul>
                        <div className="submitBtn">
                            <button type="submit" onClick={send} className="btn" disabled={disabled}> 변경</button>
                        </div>
                    </div>
                </div>
            </MyPagePwWrap>
        </>
    );
}

export default MyPagePw;
