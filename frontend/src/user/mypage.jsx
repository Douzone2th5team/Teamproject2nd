import React, {useEffect, useState} from "react";
import Header from "../UserComponents/header";
import {Link} from "react-router-dom";
import axios from "axios";
import {MypageWrap, WithdrawWrap} from "./pageStyleBasic"
import {Cookies} from "react-cookie";

const cookies = new Cookies();
const cookie = cookies.get('three');
const Mypage = () => {
    // 초기 프로필 세팅
    const [name, setName] = React.useState('')
    const [changeName, setChangeName] = React.useState('')
    const [proImg, setProImg] = React.useState('')
    const [proEmail, setProEmail] = React.useState('')
    const [protell, setProTell] = React.useState('')
    const [proInfo, setProInfo] = React.useState('')
    const [proInfo2, setProInfo2] = React.useState('')
    const [proCode, setProCode] = React.useState('')
    const [proGender, setProGender] = React.useState('')
    // 이미지 파일 변경 
    const [fileImage, setFileImage] = useState('');
    // 탈퇴 팝업
    const [withdrawPop, setWithdrawPop] = useState(false);
    // 이미지 변경 함수
    const changeImage = (e) => {
        setFileImage(e.target.files);
        document.querySelector('.profileImg img').src = URL.createObjectURL(e.target.files[0]);
    }
    // 프로필 정보 가져오기
    useEffect(() => {
        axios.get("http://localhost:3001/member/edit", {
            params: {
                'idx': cookie
            }
        })
            .then(function (result) {
                console.log(result.data);
                setName(result.data[0].name)
                setChangeName(result.data[0].name)
                setProImg(result.data[0].img)
                setProEmail(result.data[0].email)
                setProInfo(result.data[0].message)
                setProInfo2(result.data[0].message)
                setProTell(result.data[0].tel)
                setProCode(result.data[0].code)
                setProGender(result.data[0].gender)
            }).catch(function (error) {
        });
    }, []);
    // 프로필 정보 onChange 이벤트 함수
    const nameInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setChangeName(data)
    }
    const infoInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setProInfo(data)
    }
    const telInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setProTell(data)
    }
    const send = async () => {
        console.log(proEmail)
        let formData = new FormData();
        for (const key of Object.keys(fileImage)) {
            formData.append('img', fileImage[key]);
        }
        formData.append('email', proEmail);
        formData.append('name', changeName);
        formData.append('tel', protell);
        formData.append('message', proInfo);
        formData.append('gender', proGender);
        formData.append('changename', name);
        return await axios.post(`http://localhost:3001/member/editMember`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            alert('개인정보가 수정 되었습니다');
            window.location.reload();
        });
    }
    // 탈퇴진행
    const withdrawRun = async () => {
        await axios.get('http://localhost:3001/member/delete?id=' + cookie)
            .then(function () {
                alert('탈퇴되었습니다. 이용해주셔서 감사합니다.');
                cookies.remove('three')
                cookies.remove('jwt_test')
                window.location.href = '/';

            })
            .catch(function (error) {
                console.log(error);
                alert('탈퇴 실패했습니다.');
            })
    }
    
    // 탈퇴하기 html
    const WithdrawPop = () => {
        return (
            <WithdrawWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <button className="closeIcon" onClick={changePop}>
                            {/* style={{color:'#6ea9d7', width:'30px', height:'30px', cursor:'pointer'}} */}
                        <i className="fas fa-times fa-2x"></i>
                        </button>
                        <div className="title">정말 탈퇴하시겠습니까?</div>
                    </div>
                    <div className="popContent">
                        <div className="desc">
                            탈퇴하기 클릭 시 바로 탈퇴 처리됩니다.<br/>
                            탈퇴 후 재가입할 수 없으며,<br/>
                            재가입 시 동일 이메일을 사용할 수 없습니다.<br/>
                        </div>
                    </div>
                    <div className="btnItem">
                        <button onClick={changePop}>탈퇴 안 할래요</button>
                    </div>
                    <p className="linkWidthraw" onClick={withdrawRun}>탈퇴하기</p>
                </div>
            </WithdrawWrap>
        )
    }
    // 탈퇴 팝업
    const changePop = () => {
        setWithdrawPop(!withdrawPop);
        if (withdrawPop) {
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    return (
        <>
            {withdrawPop ? <WithdrawPop/> : ""}
            <Header/>
            <MypageWrap>
                <div className="container">
                    <div>
                        <ul className="navBar">
                            <Link to="/mypage">
                                <li className="menuLink on">프로필 편집</li>
                            </Link>
                            <Link to="/mypagePw">
                                <li className="menuLink">비밀번호 변경</li>
                            </Link>
                            <Link to="/mypageQnAList">
                                <li className="menuLink">문의내역</li>
                            </Link>
                            <Link to="/mypageQnA">
                                <li className="menuLink">문의하기</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem profileFirst">
                                <div className="profileImg section1">
                                    <img src={proImg === null || proImg === '' ? "img/loginback.jpg" : "/" + proImg}
                                         alt="프로필사진"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">{name}</div>
                                    <label htmlFor="inputImg">
                                        <div className="modifyImg">프로필 사진 바꾸기</div>
                                    </label>
                                    <input type="file" name="inputImg" id="inputImg" accept="image/*"
                                           style={{display: "none"}} onChange={changeImage}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">이름</div>
                                <div className="section2">
                                    <input type="text" name="name" id="name" placeholder={name} onChange={nameInput}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">소개</div>
                                <div className="section2">
                                    <textarea name="intro" id="intro"
                                              placeholder={proInfo2 === null || proInfo2 === '' || proInfo2 === 'null' ? "소개" : proInfo2}
                                              onChange={infoInput}/>
                                </div>
                            </li>
                            <li className="profileItem privacy">
                                <div className="section1">
                                    <p>
                                        <span className="star">*</span> 개인정보<span className="">아래에 작성된 개인정보는 프로필에 공개되지 않습니다.</span>
                                    </p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">이메일</div>
                                <div className="section2">
                                    <input type="text" name="email" id="email" value={proEmail} readOnly/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">번호</div>
                                <div className="section2">
                                    <input type="text" name="hp" id="hp" placeholder={'+82 ' + protell}
                                           onChange={telInput}/>
                                </div>
                            </li>
                        </ul>
                        <div className="widthraw" onClick={changePop}> 탈퇴하기</div>
                        <div className="submitBtn">
                            <button type="submit" className="btn" onClick={send}> 수정</button>
                        </div>
                    </div>
                </div>
            </MypageWrap>
        </>
    );
}

export default Mypage;
