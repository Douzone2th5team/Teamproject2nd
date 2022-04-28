import styled from 'styled-components';

const Login = styled.div`

width: 100%;
height: 100%;

.red {
  color: red;
  margin: 0 0 0 0.7rem;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  display: table;
}

.centered-container {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

#slider-intro,
.user-forms {
  display: table-cell;
  width: 50%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
}

// Left column styles
#slider-intro {
  // background: #c6e3fa;
  overflow: auto;
  background: #1d1d1d;

  img {
    position: absolute;
    height: 110%;
    width: 110%;
    -webkit-filter: blur(40px);
    top: -5%;
    left: -5%;
  }

  .filter {
    position: absolute;
    top: 0;
    display: none;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(#c6e3fa, 0.75);
  }
}

// Right columns styles
.user-forms {
  background: #151728;
  color: gray;

  h2 {
    text-align: center;
    color: lighten(#2c2b26, 10);
    font-weight: normal;
    letter-spacing: 0.0326em;
    margin-top: 80px;
    margin-bottom: 40px;

    span {
      cursor: pointer;
        &:hover {
            color: white;
            border-bottom: 1px solid #c6e3fa;
        }
    }

    .selected-login {
      color: white;
      border-bottom: 1px solid #c6e3fa;
    }

    .red {
      color: red;
      font-size: 1.2rem;
      margin: 0 0 0 0.7rem;
    }
  }

  .user-regist {
    display: none;
  }
}

/* forms items*/
label,
input[type="password"],
input[type="text"],
input[type="email"] {
  display: block;
  width: 100%;
}

label {
  color: white;
  font-size: 0.85em;
  font-weight: normal;
}

input[type="password"],
input[type="text"],
input[type="email"] {
  border: none;
  background: none;
  border-bottom: 1px solid lighten(#2c2b26, 10);
  margin-bottom: 40px;
  padding: 10px 0;
  color: #c6e3fa;
  font-size: 1em;
  transition: border 0.45s ease-in-out;

  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #c6e3fa;
  }
}

::-webkit-input-placeholder {
  color: lighten(#2c2b26, 15);
}

:-moz-placeholder {
  color: lighten(#2c2b26, 15);
}

::-moz-placeholder {
  color: lighten(#2c2b26, 15);
}

:-ms-input-placeholder {
  color: lighten(#2c2b26, 15);
}

.submit-btn {
  background: transparent;
  border: none;
  width: 75%;
  border: 1px solid white;
  padding: 10px 0;
  margin: 0 12.5%;
  color: white;
  position: relative;
  transition: all 0.45s ease-in-out;

  &:hover {
    background: #c6e3fa;
    color: white;
    border-color: #c6e3fa;
  }
}

.inline-label {
  display: initial;
  margin-bottom: 30px;
}

/*misc links*/
.misc-links {
  color: lighten(#2c2b26, 25);
  margin-top: 30px;
  display: block;
  text-align: center;
  font-size: 0.725em;
  font-style: italic;

  &:hover {
    color: #c6e3fa;
  }
}

//에니메이션
*, *:before, *:after {box-sizing: border-box;}
.roket-container {
    width: 220px; height: 380px;
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;
    animation: vibration 0.2s infinite;
}
@keyframes vibration {
    0%   {transform: translate(0,0) rotate(45deg);}
    50%  {transform: translate(1px,-1px) rotate(45deg); }
    100% {transform: translate(0,0) rotate(45deg);}
}

.capsule {
    width: 111px; height: 154px;
    position: absolute;
    left: 46px; top: 5px;
    overflow: auto;
}
.capsule .top {
    position: absolute;
    left: 0; width: 0; height: 0; padding: 0;
    border-bottom: 62px solid #f3f3f3;
    border-left: 56px solid transparent;
    border-right: 56px solid transparent;
}
.capsule .top:after {
    content:'';
    position: absolute; left: 25px; top: -14px;
    width: 0; height: 0;
    border-bottom: 84px solid #1d1d1d;
    border-left: 0px solid transparent;
    border-right: 156px solid transparent;
    transform: skew(42deg);
}
.capsule .top .shadow {
    position: absolute;
    width: 0; height: 0;
    border-bottom: 90px solid #e0e0e0;
    border-left: 20px solid transparent;
    border-right: 80px solid transparent;
    transform: skew(25deg);
}

.capsule .base {
    position: absolute; left: 0; top: 62px;
    z-index: 110;
    width: 112px; height: 99px;
    background: linear-gradient(to right, #f3f3f3 63%, #e0e0e0 63%);
}
.wing-left {
    position: absolute;
    left:16px; top: 82px;
    width: 0; height: 103px; padding: 0;
    border-right: 38px solid #743388;
    border-bottom: 19px solid transparent;
    border-top: 21px solid transparent;
    transform: rotate(5deg);
}
.wing-left:after {
    content:'';
    position: absolute; bottom: -50px;
    width: 0; height: 0;
    border-top: 20px solid transparent;
    border-right: 50px solid #1d1d1d;
    border-bottom: 50px solid transparent;
}

.wing-right {
    position: absolute;
    top: 67px; right: 30px;
    height: 97px; width: 0; padding: 0;
    border-right: 40px solid #743388;
    border-bottom: 15px solid transparent;
    border-top: 0 solid transparent;
}
.wing-right:after {
    content:'';
    position: absolute;
    top: -25px; left: -50px;
    width: 101px; height: 0;
    border-top: 23px solid transparent;
    border-right: 68px solid #1d1d1d;
    border-bottom: 45px solid transparent;
}
.tail {
    position: absolute;
    width: 101px; height: 0; z-index: 100;
    top: 153px; left: 51px;
    border-top: 23px solid #743388;
    border-right: 8px solid transparent;
    border-left: 9px solid transparent;
}
.window-big {
    width: 70px; height: 70px;
    background-color: #743388;
    border-radius: 50%;
    position: absolute;
    top: 57px; left: 66px;
    z-index: 120;
}
.window-small {
    width: 44px; height: 44px;
    background: #272425 url(http://bibibigcom.dothome.co.kr/assets/ico/icon.png);
    background-size: 100%;
    position: absolute;
    left: 79px; top: 70px;
    z-index: 130;
    border-radius: 50%;
}
.fire-1 {
    position: absolute;
    left: 64px; top: 169px; z-index: 90;
    width: 70px; height: 70px;
    background: linear-gradient(135deg, #ef8832 50%, #e82134 50%);
    transform: rotate(-40deg) skew(1deg, -11deg);
    animation: main_fire 0.1s ease-in infinite;
}
@keyframes main_fire {
    0%   {transform: translate(0, 5px) scale(1.1,1) rotate(-33deg) skew(0deg, -30deg);}
    100% {transform: translate(0, 0) scale(1.1,2) rotate(-33deg) skew(0deg, -30deg);}
}
.fire-2 {
    position: absolute; z-index: 90;
    left: 63px; top: 230px;
    width: 33px; height: 33px;
    background: linear-gradient(135deg, #ef8832 50%, #e82134 50%);
    transform: rotate(-33deg) skew(0deg, -30deg);
    animation: fire2 0.3s ease-in infinite;
}
@keyframes fire2 {
    0%   {transform: translate(0, -10px) scale(1) rotate(-33deg) skew(0deg, -30deg); opacity:1; }
    100% {transform: translate(0, 50px) scale(0.7) rotate(-33deg) skew(0deg, -30deg); opacity:0;}
}

.fire-3 {
    position: absolute; z-index: 90;
    left: 53px; top: 196px;
    width: 22px; height: 22px;
    background: linear-gradient(135deg, #ef8832 50%, #e82134 50%);
    transform: rotate(-33deg) skew(0deg, -30deg);
    animation: fire2 0.3s ease-in infinite 0.1s;
}

.fire-4 {
    position: absolute; z-index: 90;
    left: 126px; top: 200px;
    width: 22px; height: 22px;
    background: linear-gradient(135deg, #ef8832 50%, #e82134 50%);
    transform: rotate(-33deg) skew(0deg, -30deg);
    animation: fire2 0.3s ease-in infinite 0.2s;
}

.spark-1 {
    position: absolute;
    left: 40px; bottom: 77px;
    width: 12px; height: 12px;
    background-color: #e82134;
    animation: spark-fire 0.24s infinite;
}

.spark-2 {
    position: absolute;
    left: 132px; bottom: 68px;
    width: 10px; height: 10px;
    background-color: #e82134;
    animation: spark-fire 0.24s infinite;
}

.spark-3 {
    position: absolute;
    left: 109px; bottom: 80px;
    width: 10px; height: 10px;
    background-color: #e82134;
    animation: spark-fire 0.24s infinite 0.2s;
}

.spark-4 {
    position: absolute;
    left: 83px; bottom: 20px;
    width: 10px; height: 10px;
    background-color: #e82134;
    animation: spark-fire 0.24s infinite 0.14s;
}

@keyframes spark-fire {
    0%   {transform: translate(0, -10px); opacity:1;}
    100% {transform: translate(0, 50px); opacity:0;}
}

.star {
    position: absolute; z-index: 50;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fc97e9 20%, #fafc9f 80%, #bdf4f9 100%) fixed;
    animation: space 0.4s infinite;
}
.star-1  {left: 50px; top: -10px; animation-delay: 0.5s; }
.star-2  {left: 60px; top: 10px; animation-delay: 0.34s; }
.star-3  {left: 70px; top: 100px; animation-delay: 0.1s; }
.star-4  {left: 30px; top: 230px; animation-delay: 0.23s; }
.star-5  {left: 70px; top: 160px; animation-delay: 0.14s; }
.star-6  {left: 80px; top: 190px; animation-delay: 0.23s; }
.star-7  {left: 40px; top: 200px; animation-delay: 0.53s; }
.star-8  {left: 120px; top: 210px; animation-delay: 0.3s; }
.star-9  {left: 150px; top: 30px; animation-delay: 0.2s; }
.star-10 {left: 150px; top: 70px; animation-delay: 0.27s; }
.star-11 {left: 120px; top: 90px; animation-delay: 0.23s; }
.star-12 {left: 10px; top: 10px; animation-delay: 0.1s; }
.star-13 {left: 70px; top: 200px; animation-delay: 0.22s; }
.star-14 {left: 90px; top: 300px; animation-delay: 0.1s; }
.star-15 {left: 160px; top: 80px; animation-delay: 0.3s; }
.star-16 {left: 200px; top: 30px; animation-delay: 0.26s; }
.star-17 {left: 40px; top: 40px; animation-delay: 0.34s; }
.star-18 {left: 10px; top: 80px; animation-delay: 0.2s; }
.star-19 {left: 78px; top: 40px; animation-delay: 0.45s; }
.star-20 {left: 96px; top: 50px; animation-delay: 0.73s; }


@keyframes space {
    0%   {transform: translate(0, -100px) scale(1,0); opacity:1;}
    100% {transform: translate(0, 100px) scale(1,1); opacity:0;}
}

`;

const UploadForm = styled.div`
    overflow-y: auto; position: fixed; top: 0; left: 0; width: 100%; height: calc(100% - 5.3rem); margin-top: 5.3rem; 
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
    .upload_container{max-width: 100rem; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
    .upload_profile_img {width: 5rem; height: 5rem; border-radius: 50%; border: 2px solid #999; margin-left: 1.3rem; }
    .upload_profile_box {display:flex; justify-content: space-between;}
    .upload_profile_id{font-size: 1.9rem; margin-left:1rem;}
    .upload_left_box{ width: 47rem; padding: 0 0.5rem; }
    .upload_right_box{ width: 42rem; padding: 0 0.5rem; }
    .upload_header_box{padding: 1rem 0; border-bottom: 2px solid #e4e4e4;}
    .images_list{width: 100%; height:47rem; }
    .cats_img{width: 13rem; height: 3.7rem; position: absolute; top: 0.3rem; right: 4rem;}
    .wr_post_container{display: flex; margin-top:1rem; height: 13rem; overflow-wrap: anywhere; overflow-y: auto; border: 2px solid #00000045; font-size: 1.4rem; padding: 1rem; border-radius: 6px;}
    .return_main_btn{border-radius: 5px; background-color: #14c1c7; color: white; border: none; height: 4rem; cursor: pointer; width:17rem; font-size:1.4rem; box-shadow:3px 3px 3px #9b9b9b9e;}
    .option_pop_container{position:relative;}
    .option_pop_box{position:absolute; top: -3px; right: -82px;}
    .wr_post_area{padding: 0 0 0 1rem; color: #555; height: fit-content; }
    .wr_post_writer{font-weight:bold; color: #14c1c7;margin-right:1rem;}
    .up_replay_box{ height: calc(100% - 4px); border: 2px solid #00000045; border-radius: 5px;}
    .left_right_container{display:flex;justify-content: space-between;}
    .up_reply_minibox {overflow-y: auto; height: 45rem; padding: 1rem; overflow-y:  }
    .upload_time { font-size: 1.3rem; margin-left: 1rem; color: #555; }
    .up_img { width: 80%; height: 80%; border-radius: 12px; }
    .post_images_box{ position: relative; }
    .img_pagnation{position: absolute; top: 19rem; display:flex; justify-content: space-between; width: 100%; }
    .prev_arr{ width: 8rem; cursor: pointer;}
    .reply1_box{display:flex; margin: 1.3rem 1rem 1rem 1rem;}
    .re_profile_img{width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #00000054;}
    .re_reply{font-size: 1.4rem; margin:0.5rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
    .re_time{font-size: 0.7rem; margin-left:0.5rem; color: gray;}
    .reply2_box{display:flex; margin: 1rem 1rem 1rem 4.7rem;}
    .reply3_box{display:flex; margin: 1rem 1rem 1rem 8.3rem;}
    .input_reply_box { display: flex; border-top: 2px solid #e4e4e4; width: 100%; }
    .re_btn{background-color: #14c1c7; color: white; border:none; height:7rem; width:6rem; font-weight:600; font-size:1.32rem; border-radius: 5px; cursor: pointer; box-shadow: 2px 2px 2px 2px #e0dfdf; }
    .input_reply_container{ height: 4rem; position: relative; }
    .reply_to_wrap{ position: absolute; bottom: 4.5rem; left: 0.6rem; }
    .like_img{width:2rem; height:2rem;}
    .like_box{display:flex; margin-left: auto;}
    .in_input{outline: none; width:32rem; height:6rem; border: 1px solid #afadadb0; border-radius:10px; box-shadow: 2px 2px 2px #e0dfdf;
        font-size: 1.3rem; padding: 0.5rem 1rem; font-family: 'Nanum Gothic', sans-serif; overflow-y: auto; resize: none; }
    .re_time_reply_box{display:flex;}
    .reply_btn{border:none; background:none; color:gray; font-size:0.5rem; cursor:pointer; margin:0; line-height:0.1rem; font-weight:600;}
    .re_delete_btn{background: none; border: none;}
    .like_delete_box{display:flex;}
    .re_delete_btn{padding:0;font-size: 0.5rem; line-height: 0.1rem; color: gray; margin: 0; font-weight:600;}
    .re_profile{ display:flex; align-items: center;}
    .in_input_box{margin:0.5rem;}
    .like_btn{background:none; border:none; display:flex; align-items:center; font-size:1.8rem;}
    .re_id_box{display:flex; width: 23rem}
    .re_id_div{margin:1rem 0 0 0.5rem;}
    .re_id_span{font-size: 1.5rem; font-weight: 600; line-height: 1rem;}
    .re_btn_box { margin: 0.5rem 0; }
    .header_btn, .up_pro_time_container{ display: flex; align-items:center; margin-right: 0.5rem; }
    .upd_btn, .del_btn, .main_btn{ cursor: pointer; font-size: 1.2rem; margin-right: 0.5rem; background-color: #14c1c7; padding: 0.5rem 1.2rem; color: white; border: none; font-weight: 600;border-radius: 5px;}
    .nomatch{display:none;}
    `;

const EditPopWrap = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Courgette&family=Noto+Sans+KR:wght@300&display=swap');
    z-index: 100; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
    textarea { border: 1px solid lightgray; font-size: 1.4rem; background-color: #fff; border-radius: 3px; width: calc(100% - 2rem); height: 15rem; color: #222; padding: 1rem; overflow-y: auto; font-family: 'Noto Sans KR', sans-serif; resize: none; }
    textarea:focus { outline:none; }
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 55rem; height: auto; }
    .popHeader { padding: 2rem 5rem 2rem; text-align: center; }
    .closeIcon { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; }
    .title { font-size: 2rem; font-weight: 700; }
    .popContent{ padding: 0 3.3rem; }
    button { border: 0; outline: none; appearance: none; cursor:pointer; vertical-align: center; padding: 1rem 1.8rem; font-size: 1.6rem; border-radius: 12px; background-color: #14c1c7; color: #fff; }
    button:nth-child(2) { margin-left: 1rem; }
    .btnWrap { text-align: center; padding: 1rem 0 1.5rem; }
    // 게시물 업로드 팝업1(업로드할 이미지) css
    .post1_pop_container{z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.5);}
    .post1_pop_box{ position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background:white; border:none; width: 60rem; height: 56rem; border-radius: 15px; padding: 1rem; }
    .post1_pop_sec1{ display:flex; justify-content: space-between; margin-top:1rem; }
    .pop3_close_btn{ background:none; border:none; }
    .ch_upload_img{ font-size:2.3rem; margin: 0 0 0 20rem; font-weight:600; }
    .post1_pop_sec2_box { margin-top:3rem; }
    #files { display:none; }
    .prev_img { background-color: #efefef; width:14rem; height:14rem; margin:1rem; }
    .prev_img img { width: 100%; height: 100%; }
    .prev_img_be { background-color: #efefef; width:14rem; height:14rem; margin:1rem; }
    .prev_upload { display:flex; flex-wrap:wrap; min-height:32rem; }
    .prev_upload_be { display:flex; flex-wrap:wrap; min-height:15rem; }
    #upload { cursor:pointer; }
    #upload p { display: inline-block; margin-left: .5rem; position: relative; }
    .file_aa { display:flex; align-items: center; }
    .prev_upload_box { border: 1px solid lightgray; }
    .upload_txt_box { margin: 0.8rem 1rem; }
    .upload_img_ch { border:none; background-color:#3bf1f1; color:white; width:9rem; height:3.5rem; cursor:pointer; border-radius:5px; cursor:pointer;}
    .post1_pop_sec3 { margin-top:1.3rem; }
    .post1_pop_sec3_box { display: flex; justify-content: center; }
    .img_del { background:none; border:none; position:absolute; top: 1.2rem; right: 1.5rem; font-size: 2rem;}
    .prev_upload span { position:relative; }
    .fa-times-circle { color:#3bf1f1; }
`;

const DelPopWrap = styled.div` 
    z-index: 100; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3);
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 35rem; height: auto; }
    .popHeader { padding-top: 3rem; text-align: center; }
    .title img {width:5.5rem}
    .textWrap { font-size: 1.7rem; text-align: center; padding: 3rem 0; }
    button { border: 0; outline: none; appearance: none; cursor:pointer; vertical-align: center; padding: 1rem 2rem; font-size: 1.4rem; border-radius: 12px; background-color: #14c1c7; color: #fff; margin: 0 0.4rem; font-weight: bold;}
    .btnWrap { text-align: center; padding: 0.5rem 0 3rem; }
`;

const Regi1 = styled.div`
input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  input[type="checkbox"] {
    -webkit-appearance: auto;
  }
  
  .body {
    width: 37rem;
    padding: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .topNum {
    display: flex;
    justify-content: center;
    align-items: center;
  
    img {
      width: 12rem;
    }
  }
  
  .topnav h2 {
    color: #14c1c7;
    text-align: center;
    font-size: 1.7rem;
  }
  
  .forregi {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
  
    input {
      border-bottom: 1px solid lightgray;
      height: 4rem;
      color: #222;
      border-left: none;
      border-right: none;
      margin-bottom: 1rem;
      font-size: 1.4rem;
      width: 95%;
      padding-left: 0.5rem;
    }
  }
  
  .checkbtn {
    input {
      position: relative;
      bottom: -0.4rem;
      height: 2rem;
      width: auto;
      margin-bottom: 0;
      margin-right: 1rem;
    }
  
    span {
      color: #14c1c7;
      font-weight: bold;
      margin-right: 0.3rem;
    }
  }
  
  .activebtn button {
    padding: 1.1rem 0;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    width: 100%;
    margin: 1.2rem 0 0;
    border-radius: 10px;
    border: none;
    background: #14c1c7;
    cursor: pointer;
  
    &:disabled {
      background: #dfdfdf;
    }
  }
  
  .red {
    color: red;
    font-size: 1.2rem;
    margin: 0 0 0 1.2rem;
    text-align: left;
  }
  
  .checkbtn {
    margin-left: 1.1rem;
  
    p {
      font-size: 1.3rem;
      position: relative;
      top: -7px;
      left: -4px;
      z-index: 10;
      display: flex;
    }
  }
  
  .forheigth {
    height: 7rem;
    text-align: center;
  }
  
  .checkinput {
    border: 1px red;
  }
  
  .checkimg {
    position: relative;
    top: 6px;
  }
  
  .genderSelectBox {
    margin: 1rem 0 2rem;
    font-size: 1.35rem;
  
    span {
      font-size: 1.5rem;
      color: #666;
      margin-left: 1rem;
    }
  
    label {
      margin-left: 2.5rem;
    }
  }
  
  .choiceGender {
    margin-left: 1rem;
  }
  
  input {
    &[id="check"], &[id="check2"] {
      display: none;
    }
  
    &[type="radio"] {
      display: none;
  
      + label {
        display: inline-block;
        height: 2.7rem;
        padding-left: 3.2rem;
        background: url(/img/admin/checkbox.png) no-repeat 0 0;
        background-size: 2.3rem;
        cursor: pointer;
        vertical-align: middle;
      }
  
      &:checked + label {
        height: 2.3rem;
        background: url(/img/admin/check.png) no-repeat 0 0;
        background-size: 1.8rem;
      }
    }
  
    &[type=checkbox] {
      height: 0;
      width: 0;
      visibility: hidden;
    }
  }
  
  .checkbtn {
    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 4rem;
      height: 2.5rem;
      background: #999;
      display: block;
      border-radius: 100px;
      position: relative;
      top: -3px;
      margin-right: 8px;
  
      &:after {
        content: '';
        position: absolute;
        top: 0.3rem;
        left: 0.4rem;
        width: 1.9rem;
        height: 1.9rem;
        background: #fff;
        border-radius: 90px;
        transition: 0.3s;
      }
    }
  
    input:checked + label {
      background: #14c1c7;
  
      &:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
      }
    }
  
    label:active:after {
      width: 45px;
    }
  }
`;

const MyQnaDetailWrap = styled.div`
* {
    text-decoration: none;
  }
  
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .pageNation {
    list-style: none;
    display: flex;
  
    li {
      padding: 0.6rem;
      font-size: 1.8rem;
      background-color: none;
      color: #888;
      cursor: pointer;
      font-weight: bold;
    }
  }
  
  input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .container {
    max-width: 100rem;
    margin: 0 auto;
  }
  
  .navBar {
    float: left;
    width: 12rem;
    padding: 7rem 0rem 0rem 0rem;
    margin: 1.5rem;
  }
  
  .menuLink {
    margin-bottom: 4rem;
    color: #555;
    cursor: pointer;
    font-size: 1.6rem;
  
    &.on {
      font-weight: 600;
      color: #14c1c7;
    }
  
    &:hover {
      color: #14c1c7;
      font-weight: 600;
    }
  }
  
  .content {
    padding: 4rem 3rem 5rem 10.5rem;
    overflow: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 79.5vh;
  }
  
  h1 {
    font-size: 1.75rem;
    color: #444;
    margin-bottom: 2rem;
  }
  
  .profile {
    display: flex;
  }
  
  .profileImg {
    width: 11rem;
  
    img {
      width: 5rem;
      border-radius: 50%;
      vertical-align: middle;
      border: 2px solid #999;
    }
  }
  
  .profileName {
    font-size: 1.5rem;
    margin: 0;
    position: relative;
    top: 1.5rem;
    font-weight: bold;
    color: #555;
  }
  
  table {
    margin-top: 2rem;
    width: 90%;
  }
  
  .content-box {
    height: 37rem;
    border-radius: 10px;
    padding-top: 2rem;
  }
  
  .content2 {
    border-radius: 10px;
    font-size: 1.4rem;
    text-align: left;
    width: calc(100% - 4rem);
    margin: 0 auto;
    border-bottom: 2px solid rgb(215, 215, 215);
    box-shadow: 3px 3px 3px 4px rgb(240, 240, 240);
    padding: 2.3rem 3rem;
  
    table {
      th {
        width: 10rem;
        padding: 1.4rem 0;
      }
  
      td {
        width: calc(100% - 10rem);
  
        span {
          color: #14c1c7;
          font-weight: bold;
        }
      }
    }
  
    .qnaContent td {
      width: calc(100% - 10rem);
      overflow-wrap: anywhere;
      border: 1px solid lightgray;
      padding: 1rem;
      border-radius: 8px;
    }
  }
  
  input[type="button"] {
    background-color: #14c1c7;
    border: 1px solid white;
    color: white;
    width: 9rem;
    height: 3.5rem;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px rgb(210, 210, 210);
    margin-left: 2rem;
    font-size: 1.3rem;
    cursor: pointer;
  }
  
  .button-box {
    text-align: center;
    margin-top: 3rem;
  }
`;

const MyPageQnAListWrap = styled.div`
* {
    text-decoration: none;
  }
  
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .pageNation {
    list-style: none;
    display: flex;
  
    li {
      padding: 0.6rem;
      font-size: 1.8rem;
      background-color: none;
      color: #888;
      cursor: pointer;
      font-weight: bold;
    }
  }
  
  input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .container {
    max-width: 100rem;
    margin: 0 auto;
  }
  
  .navBar {
    float: left;
    width: 12rem;
    padding: 7rem 0rem 0rem 0rem;
    margin: 1.5rem;
  }
  
  .menuLink {
    margin-bottom: 4rem;
    color: #555;
    cursor: pointer;
    font-size: 1.6rem;
  
    &.on {
      font-weight: 600;
      color: #14c1c7;
    }
  
    &:hover {
      color: #14c1c7;
      font-weight: 600;
    }
  }
  
  .content {
    margin: 8rem 0rem 0rem 0rem;
    padding: 0rem 0rem 0rem 0rem;
    overflow: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 79.5vh;
    width: -webkit-fill-available;
  }
  
  h1 {
    font-size: 1.75rem;
    color: #444;
    margin-bottom: 2rem;
  }
  
  .profile {
    display: flex;
  }
  
  .profileImg {
    width: 11rem;
  
    img {
      width: 5rem;
      border-radius: 50%;
      vertical-align: middle;
      border: 2px solid #999;
    }
  }
  
  .profileName {
    font-size: 1.5rem;
    margin: 0;
    position: relative;
    top: 1.5rem;
    font-weight: bold;
    color: #555;
  }
  
  table {
    margin-top: 2rem;
    text-align: center;
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #9b9b9b;
    font-size: 1.4rem;
  
    th, td {
      border: 1px solid #9b9b9b;
      height: 3.8rem;
    }
  
    th {
      background-color: rgb(248, 250, 252);
    }
  }
  
  .detail-link {
    color: black;
  
    &:hover {
      color: #14c1c7;
      font-weight: bolder;
      font-size: 1.45rem;
      overflow: auto;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
const MyPageQnAWrap = styled.div`
* {
    text-decoration: none;
  }
  
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .container {
    max-width: 100rem;
    margin: 0 auto;
  }
  
  .navBar {
    float: left;
    width: 12rem;
    padding: 7rem 0rem 0rem 0rem;
    margin: 1.5rem;
  }
  
  .menuLink {
    margin-bottom: 4rem;
    color: #555;
    cursor: pointer;
    font-size: 1.6rem;
  
    &.on {
      font-weight: 600;
      color: #14c1c7;
    }
  
    &:hover {
      color: #14c1c7;
      font-weight: 600;
    }
  }
  
  .content {
    margin: 8rem 0rem 0rem 2rem;
    padding: 0rem 0rem 0rem 0rem;
    overflow: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 79.5vh;
    width: -webkit-fill-available;
  }
  
  .profileItem {
    position: relative;
    align-items: center;
    margin-bottom: 2rem;
    margin-left: 0.5rem;
  
    select, option {
      margin-right: 1rem;
      font-size: 1.4rem;
      width: 18rem;
      height: 4rem;
      padding: 0.5rem;
      border-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  
    select:focus {
      border-color: rgba(0, 0, 0, 0.1);
      outline: none;
    }
  
    div {
      display: inline-block;
    }
  
    h1 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
      color: #444;
    }
  }
  
  .section1 {
    margin-bottom: 0.5rem;
    width: 11rem;
    font-size: 1.45rem;
    font-weight: 600;
    vertical-align: top;
  }
  
  .section2 {
    width: 80%;
    font-size: 1.3rem;
  }
  
  .modifyImg {
    color: #1cbbeb;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: .5rem;
  }
  
  .profileImg img {
    width: 5rem;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #999;
  }
  
  .section2 {
    input {
      border: 1px solid lightgray;
      background-color: #fff;
      border-radius: 3px;
      width: 90%;
      height: 4rem;
      font-size: 1.4rem;
      padding-left: 1rem;
    }
  
    textarea {
      border: 1px solid lightgray;
      background-color: #fff;
      border-radius: 3px;
      width: 90%;
      height: 16rem;
      font-size: 1.4rem;
      padding-left: 1rem;
      padding-top: 1rem;
    }
  
    h3 {
      font-size: 1.6rem;
      margin: 2rem 0 0 1rem;
      font-weight: 400;
    }
  
    p {
      font-size: 1.5rem;
      margin: 0;
      position: relative;
      top: 1.5rem;
      font-weight: bold;
      color: #555;
    }
  }
  
  .widthraw {
    color: #1cbbeb;
    cursor: pointer;
    display: inline-block;
    font-size: 1.5rem;
    position: relative;
    left: 4rem;
  
    &:hover {
      font-weight: 600;
    }
  }
  
  .profileSelect {
    margin-left: 1.5rem;
  }
  
  .firstItem {
    margin-top: 4rem;
  }
  
  .profileFirst {
    margin-bottom: 3rem;
  }
  
  .proFirst {
    margin-bottom: 4rem;
  }
  
  .QnaTitle {
    margin-top: 0.5rem;
    color: #444;
  }
  
  .red {
    color: #14c1c7;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  #target {
    width: 81%;
  }
  
  .submitBtn {
    text-align: center;
    margin-top: 3rem;
  }
  
  .btn {
    width: 12rem;
    height: 4rem;
    font-size: 1.5rem;
    background: #191970;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    box-shadow: 3px 3px 3px #d0d0d0;
  }
  
  .popup {
    padding: 1.5rem 1rem 1rem;
  }
  
  .fa-search {
    font-size: 2.6rem;
    color: #14c1c7;
    cursor: pointer;
  
    &:hover {
      font-size: 2.75rem;
      color: #14c1c7;
    }
  }
  
  // 모달창 css
  
  .mw {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .5;
      filter: alpha(opacity = 50);
    }
  
    .fg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 45rem;
      height: 52rem;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 30px;
    }
  }
  
  .closeBtn {
    position: absolute;
    cursor: pointer;
    font-size: 4rem;
    top: 1.5rem;
    right: 3rem;
  }
  
  .mw .fg .modalTitle {
    border: none;
    width: 14rem;
    margin: 2rem auto;
    font-size: 2rem;
    font-weight: bold;
  }
  
  .fa-times {
    font-size: 3.5rem;
  }
  
  .nonData {
    font-size: 1.6rem;
    color: #777;
    margin: 3rem auto;
  }
  
  .searchName {
    input {
      &[type="text"] {
        width: 25rem;
        margin-left: 1.5rem;
        border: none;
        border-bottom: 2px solid #9b9b9b;
        height: 3rem;
        font-size: 1.4rem;
      }
  
      &[type="button"] {
        width: 6rem;
        padding: 1rem;
        margin-left: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
        color: #14c1c7;
        cursor: pointer;
        border: none;
        box-shadow: 1.5px 1.5px 1.5px 2px #e7e7e7;
      }
    }
  
    margin-left: 4rem;
    margin-top: 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
  }
  
  .findForm {
    border: 1px solid #c7c7c7;
    width: 38rem;
    height: 28rem;
    margin-left: 3.6rem;
    margin-top: 2rem;
    overflow-y: auto;
    padding-bottom: 3rem;
  
    p {
      display: flex;
      align-items: center;
      border: 1px solid #c7c7c7;
      height: 3rem;
      width: 85%;
      margin: 0rem auto 0.5rem;
      border-radius: 5px;
      padding: 1rem 1.5rem;
    }
  }
  
  .email {
    color: gray;
    cursor: pointer;
  
    &:hover {
      color: #14c1c7;
    }
  }
  
  .fa-angry {
    font-size: 3rem;
  }
  
  .friendImg {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid lightgray;
    margin-right: 1rem;
  }
`;
const MyPagePwWrap = styled.div`
* {
    text-decoration: none;
  }
  
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .container {
    max-width: 100rem;
    margin: 0 auto;
  }
  
  .navBar {
    float: left;
    width: 12rem;
    padding: 7rem 0rem 0rem 0rem;
    margin: 1.5rem;
  }
  
  .menuLink {
    margin-bottom: 4rem;
    color: #555;
    cursor: pointer;
    font-size: 1.6rem;
  
    &.on {
      font-weight: 600;
      color: #14c1c7;
    }
  
    &:hover {
      color: #14c1c7;
      font-weight: 600;
    }
  }
  
  .content {
    margin: 10rem 0rem 0rem 2rem;
    padding: 0rem 0rem 0rem 0rem;
    overflow: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    height: 77.5vh;
    width: -webkit-fill-available;
  }
  
  .profileItem {
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 1.5rem;
    margin-left: 4.5rem;
  }
  
  .profileFirst {
    margin-left: -2rem;
    margin-bottom: 5rem;
  }
  
  .section1 {
    width: 11rem;
    position: relative;
    right: 3rem;
    font-size: 1.4rem;
    text-align: left;
    font-weight: 600;
    margin-top: -2rem;
  }
  
  .section2 {
    width: 80%;
    height: 6.2rem;
  }
  
  .modifyImg {
    color: #1cbbeb;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: .5rem;
  }
  
  .profileImg img {
    width: 6.5rem;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #999;
    margin-left: 6rem;
  }
  
  .profileName {
    font-size: 1.7rem;
    font-weight: bold;
    color: #444;
    margin-top: 1rem;
    margin-left: 0.5rem;
  }
  
  .section2 {
    .red {
      font-size: 1.2rem;
      margin-top: 0.5rem;
      color: #fb3b3b;
    }
  
    input {
      border: 1px solid lightgray;
      background-color: #fff;
      border-radius: 5px;
      width: 90%;
      height: 4rem;
      color: black;
      font-size: 1.4rem;
      padding-left: 1rem;
    }
  
    textarea {
      border: 1px solid lightgray;
      background-color: #fff;
      border-radius: 5px;
      width: 100%;
      height: 8rem;
      color: black;
      font-size: 1.4rem;
      padding-left: 1rem;
      padding-top: 1rem;
    }
  
    h3 {
      font-size: 1.6rem;
      margin: 2rem 0 0 1rem;
      font-weight: 400;
    }
  
    p {
      font-size: 1.4rem;
      margin: 0;
      margin-left: 1rem;
    }
  }
  
  .widthraw {
    color: #1cbbeb;
    cursor: pointer;
    display: inline-block;
    font-size: 1.5rem;
    position: relative;
    left: 4rem;
  
    &:hover {
      font-weight: 600;
    }
  }
  
  .submitBtn {
    text-align: center;
    margin-top: 5rem;
  }
  
  .btn {
    &:disabled {
      background: #dfdfdf;
    }
  
    width: 12rem;
    height: 4rem;
    font-size: 1.5rem;
    background: #191970;
    border-radius: 7px;
    color: #fff;
    cursor: pointer;
    box-shadow: 3px 3px 3px #d0d0d0;
  }
  
  .success {
    display: none;
  }
`;

const MypageWrap = styled.div`
margin: ;
* {
    text-decoration: none;
  }
  
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .container {
    max-width: 100rem;
    margin: 0 auto;
  }
  
  .navBar {
    float: left;
    width: 12rem;
    padding: 7rem 0rem 0rem 0rem;
    margin: 1.5rem;
  }
  
  .menuLink {
    margin-bottom: 4rem;
    color: #555;
    cursor: pointer;
    font-size: 1.6rem;
  
    &.on {
      font-weight: 600;
      color: #14c1c7;
    }
  
    &:hover {
      color: #14c1c7;
      font-weight: 600;
    }
  }
  
  .content {
    padding: 7rem 0rem 0rem 0rem;
    overflow: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: -webkit-fill-available;
  }
  
  .profileItem {
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 3rem;
  }
  
  .profileFirst {
    margin-left: -1.5rem;
    margin-bottom: 4rem;
  }
  
  .profileList {
    margin-left: 9rem;
  }
  
  .privacy {
    margin-left: -1rem;
  
    .section1 {
      width: 100%;
      font-size: 1.5rem;
      color: #777;
  
      .star {
        color: #14c1c7;
        font-size: 1.5rem;
        margin-left: 0;
      }
  
      span {
        font-size: 1.3rem;
        color: #14c1c7;
        margin-left: 3rem;
      }
    }
  }
  
  .section1 {
    width: 6rem;
    position: relative;
    right: 3rem;
    font-size: 1.4rem;
    text-align: left;
    font-weight: 600;
  }
  
  .section2 {
    width: 80%;
  }
  
  .modifyImg {
    color: #14c1c7;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.4rem;
    margin-top: 1rem;
  }
  
  .profileName {
    font-size: 1.7rem;
    font-weight: bold;
    color: #444;
  }
  
  .profileImg img {
    width: 6.5rem;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #999;
  }
  
  .section2 {
    input {
      border: 1px solid lightgray;
      background-color: #fff;
      border-radius: 5px;
      width: 100%;
      height: 4rem;
      color: black;
      font-size: 1.4rem;
      padding-left: 1rem;
    }
  
    textarea {
      border: 1px solid lightgray;
      background-color: #fff;
      border-radius: 5px;
      width: 100%;
      height: 8rem;
      color: black;
      font-size: 1.4rem;
      padding-left: 1rem;
      padding-top: 1rem;
    }
  
    h3 {
      font-size: 1.6rem;
      margin: 2rem 0 0 1rem;
      font-weight: 400;
    }
  
    p {
      font-size: 1.4rem;
      margin: 0;
      margin-left: 1rem;
    }
  }
  
  .widthraw {
    color: #14c1c7;
    cursor: pointer;
    display: inline-block;
    font-size: 1.4rem;
    position: relative;
    margin-left: 84%;
  
    &:hover {
      font-weight: bold;
    }
  }
  
  .submitBtn {
    text-align: center;
    margin-top: 2rem;
  }
  
  .btn {
    width: 13rem;
    height: 4rem;
    font-size: 1.5rem;
    background: #191970;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    box-shadow: 3px 3px 3px #d0d0d0;
  }
`;

const WithdrawWrap = styled.div`
    z-index: 100; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.3); text-align: center;
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 35rem; height: 30rem; }
    .closeIcon { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; }
    .popHeader { padding: 4rem 5rem 3rem; }
    .title { font-size: 2rem; font-weight: 700; }
    .popContent { padding: 0 3rem 3rem; }
    .desc { font-size: 1.4rem; color: rgba(35,35,35,.8); }
    .btnItem button { border: 0; outline: none; background: none; background-color: rgba(0,0,0,0); -webkit-appearance: none; -moz-appearance: none; appearance: none; border-radius: 0; cursor:pointer; vertical-align: center; padding: 1rem 1.8rem; font-size: 1.6rem; border-radius: 12px; background-color: #14c1c7; color: #fff; }
    .linkWidthraw { color: rgba(34,34,34,.5); text-decoration: underline; margin-top:1.5rem; font-size: 1.3rem; cursor: pointer; }
`;

const MainTalkForm = styled.div`
* {
    text-decoration: none;
  }
  
  .container {
    padding-top: 1.5rem;
    max-width: 100%;
    margin: 0 auto;
  }
  
`;

const MainForm = styled.div`
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700|Source+Sans+Pro:300,400,600,700&display=swap");

$bg-color: #151728;
$border-color: #272a3a;
$title-font: "DM Sans", sans-serif;
$body-font: "Source Sans Pro", sans-serif;
$side-title: #5c5e6e;
$button: #8f98a9;

* {
  outline: none;
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: $body-font;
  background-color: #373e57;
  color: #ccc8db;
}

.container {
  background-color: $bg-color;
  display: flex;
  max-width: 1600px;
  height: 100vh;
  overflow: auto;
  margin: 0 auto;
}

.left-side {
  width: 260px;
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  background-color: $bg-color;
  overflow: auto;
  flex-shrink: 0;
  @media screen and (max-width: 930px) {
    &.active {
      z-index: 4;

      & > *:not(.logo) {
        opacity: 1;
        transition: 0.3s 0.2s;
      }

      .left-side-button svg:first-child {
        opacity: 0;
      }

      .left-side-button svg:last-child {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }
    &:not(.active) {
      width: 56px;
      overflow: auto;

      & > *:not(.logo):not(.left-side-button) {
        opacity: 0;
      }

      .logo {
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        transform-origin: bottom;
        display: flex;
        align-items: center;
        margin-top: -10px;
      }
    }
  }
}

.right-side {
  margin-top: 5.2rem;
  width: 280px;
  flex-shrink: 0;
  margin-left: auto;
  overflow: auto;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1210px) {
    position: fixed;
    right: 0;
    top: 0;
    transition: 0.3s;
    height: 100%;
    transform: translateX(280px);
    z-index: 4;

    &.active {
      transform: translatex(0);
    }
  }
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #181d2f;
}

.logo {
  font-family: $title-font;
  font-size: 15px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  height: 68px;
  line-height: 68px;
  letter-spacing: 4px;
  position: sticky;
  top: 0;
  background: linear-gradient(
                  to bottom,
                  rgba(21, 23, 40, 1) 0%,
                  rgba(21, 23, 40, 1) 76%,
                  rgba(21, 23, 40, 0) 100%
  );
}

.side-title {
  font-family: $title-font;
  color: $side-title;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 20px;
}

.side-wrapper {
  padding: 30px;
}

.side-menu {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  white-space: nowrap;

  svg {
    margin-right: 16px;
    width: 16px;
  }

  a {
    text-decoration: none;
    color: #9c9cab;
    display: flex;
    align-items: center;

    &:hover {
      color: #fff;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}

.follow-me {
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: auto;
  overflow: auto;
  color: #9c9cab;
  padding: 0 20px;
  height: 52px;
  flex-shrink: 0;
  border-top: 1px solid $border-color;
  position: relative;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}

.follow-text {
  display: flex;
  align-items: center;
  transition: 0.3s;
}

.follow-me:hover {
  .follow-text {
    transform: translateY(100%);
  }

  .developer {
    top: 0;
  }
}

.developer {
  position: absolute;
  color: #fff;
  left: 0;
  top: -100%;
  display: flex;
  transition: 0.3s;
  padding: 0 20px;
  align-items: center;
  background-color: $border-color;
  width: 100%;
  height: 100%;
}

.developer img {
  border-radius: 50%;
  width: 26px;
  height: 26px;
  object-fit: cover;
  margin-right: 10px;
}

.search-bar {
  height: 60px;
  background-color: $bg-color;
  z-index: 3;
  position: relative;

  input {
    height: 100%;
    width: 100%;
    display: block;
    background-color: transparent;
    border: none;
    padding: 0 54px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3e%3cpath d='M508.9 478.7L360 330a201.6 201.6 0 0045.2-127.3C405.3 90.9 314.4 0 202.7 0S0 91 0 202.7s91 202.6 202.7 202.6c48.2 0 92.4-17 127.3-45.2L478.7 509c4.2 4.1 11 4.1 15 0l15.2-15.1c4.1-4.2 4.1-11 0-15zm-306.2-116c-88.3 0-160-71.8-160-160s71.7-160 160-160 160 71.7 160 160-71.8 160-160 160z' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%235C5D71'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: 25px 50%;
    color: #fff;
    font-family: $body-font;
    font-weight: 600;

    &::placeholder {
      color: #5c5d71;
    }
  }
}

.main-container {
  padding: 20px;
  flex-grow: 1;
  overflow: auto;
  background-color: #24273b;
  margin-top: 5.2rem;
}

.profile {
  position: relative;
  height: 40vh;
  min-height: 250px;
  max-height: 350px;
  z-index: 1;

  &-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background-image: url("https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(50px);
    opacity: 0.7;
  }
}

.profile-menu {
  position: absolute;
  bottom: 0;
  padding-left: 200px;
  background: $bg-color;
  width: 100%;
  display: flex;
  border-radius: 0 0 4px 4px;
}

.profile-menu-link {
  padding: 20px 16px;
  color: $side-title;
  transition: 0.3s;
  cursor: pointer;

  &.active,
  &:hover {
    color: #fff;
    background-color: #1b1d2e;
    border-bottom: 3px solid #1488fa;
  }
}

.profile-avatar {
  position: absolute;
  align-items: center;
  display: flex;
  z-index: 1;
  bottom: 16px;
  left: 24px;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid $bg-color;
}

.profile-name {
  margin-left: 24px;
  margin-bottom: 24px;
  font-size: 22px;
  color: #fff;
  font-weight: 600;
  font-family: $title-font;
}

.timeline {
  display: flex;
  padding-top: 20px;
  position: relative;
  z-index: 2;

  &-left {
    width: 310px;
    flex-shrink: 0;
  }

  &-right {
    flex-grow: 1;
    padding-left: 20px;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    &-right {
      padding-left: 0;
      margin-bottom: 20px;
    }
    &-left {
      width: 100%;
    }
  }
}

.box {
  background-color: $bg-color;
  border-radius: 4px;
}

.intro {
  padding: 20px;

  &-title {
    font-family: $title-font;
    color: $side-title;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &-menu {
    background-color: $button;
    box-shadow: -8px 0 0 0 $button, 8px 0 0 0 $button;
    width: 5px;
    height: 5px;
    border: 0;
    padding: 0;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 8px;
  }
}

.info {
  font-size: 15px;

  &-item {
    display: flex;
    color: #c3c5d5;
  }

  &-item + &-item {
    margin-top: 14px;
  }

  &-item a {
    margin-left: 6px;
    color: #1771d6;
    text-decoration: none;
  }

.event {
  position: relative;
  margin-top: 20px;
  padding: 10px;
}

.event-wrapper {
  position: relative;
}

.event-img {
  max-width: 100%;
  display: block;
  padding-bottom: 12px;
}

.event-date {
  position: absolute;
  left: 20px;
  top: 15px;
}

.event-month {
  background-color: #1687fa;
  padding: 7px 20px;
  font-weight: 600;
  font-family: $title-font;
  color: #fff;
  text-align: center;
  border-radius: 4px 4px 0 0;
}

.event-day {
  width: 100%;
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  font-family: $title-font;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 6px 0;
  text-align: center;
}

.event-title {
  color: #c3c5d5;
  margin-bottom: 5px;
  font-family: $title-font;
  font-weight: 600;
  padding: 0 14px;
}

.event-subtitle {
  color: $side-title;
  font-family: $title-font;
  font-size: 13px;
  font-weight: 500;
  padding: 0 14px;
}

.pages {
  margin-top: 20px;
  padding: 20px;
}

.user {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user + .user {
  margin-top: 18px;
}

.user-img {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-right: 15px;
  object-fit: cover;
  object-position: center;
}

.username {
  font-size: 15px;
  font-family: $title-font;
}

.status-menu {
  padding: 20px;
  display: flex;
  align-items: center;

  &-item {
    text-decoration: none;
    color: #ccc8db;
    padding: 10px 14px;
    line-height: 0.7;
    font-family: $title-font;
    font-weight: 500;
    border-radius: 20px;

    &.active,
    &:hover {
      background-color: #2e2e40;
      color: #fff;
    }
  }

  &-item + &-item {
    margin-left: 10px;
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;
    &-item + &-item {
      margin-left: 0;
    }
  }
}

.status-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.status-main {
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $border-color;
  padding-bottom: 20px;
  flex-wrap: wrap;
}

.status-textarea {
  flex-grow: 1;
  background-color: transparent;
  border: none;
  resize: none;
  margin-top: 15px;
  color: #fff;
  max-width: calc(100% - 70px);

  &::placeholder {
    color: #5c5d71;
  }
}

.status-actions {
  display: flex;
  padding: 10px 20px;
}

.status-action {
  text-decoration: none;
  color: #ccc8db;
  margin-right: 20px;
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    flex-shrink: 0;
    margin-right: 8px;
  }

  @media screen and (max-width: 1320px) {
    width: 16px;
    overflow: auto;
    color: transparent;
    white-space: nowrap;
  }
}

.status-share {
  background-color: #1b86f9;
  border: none;
  color: #fff;
  border-radius: 4px;
  padding: 10px 20px;
  margin-left: auto;
  box-shadow: 0 0 20px #1b86f9;
  cursor: pointer;
}

.album {
  padding-top: 20px;
  margin-top: 20px;

  .status-main {
    border: none;
    display: flex;
  }

  .intro-menu {
    margin-bottom: auto;
    margin-top: 5px;
  }
}

.album-detail {
  width: calc(100% - 110px);
}

.album-title span {
  color: #1771d6;
  cursor: pointer;
}

.album-date {
  font-size: 15px;
  color: #595c6c;
  margin-top: 4px;
}

.album-content {
  padding: 0 20px 20px;
}

.album-photo {
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  margin-top: 10px;
}

.album-photos {
  display: flex;
  margin-top: 20px;
  max-height: 30vh;
}

.album-photos > .album-photo {
  width: 50%;
}

.album-right {
  width: 50%;
  margin-left: 10px;
  line-height: 0;
  display: flex;
  flex-direction: column;

  .album-photo {
    height: calc(50% - 10px);
  }
}

.album-actions {
  padding: 0 20px 20px;
}

.album-action {
  margin-right: 20px;
  text-decoration: none;
  color: #a2a4b4;
  display: inline-flex;
  align-items: center;
  font-weight: 600;

  &:hover {
    color: #fff;
  }

  svg {
    width: 16px;
    margin-right: 6px;
  }
}

.account-button {
  border: 0;
  background: 0;
  color: #64677a;
  padding: 0;
  cursor: pointer;
  position: relative;
}

.account-button svg {
  width: 20px;
}

.account-button:not(.right-side-button) + .account-button:before {
  position: absolute;
  right: 0px;
  top: -2px;
  background-color: #1b86f8;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  content: "";
  border: 2px solid $bg-color;
}

.account-profile {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin: 0 10px;
}

.account-user {
  display: inline-flex;
  align-items: center;
  color: #64677a;
  font-weight: 600;

  span {
    font-size: 10px;
    font-weight: normal;
  }
}

.account {
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: $bg-color;
  z-index: 3;
  flex-shrink: 0;
}

.stories {
  border-bottom: 1px solid $border-color;
}

.stories .user-img {
  border: 2px solid #e2b96c;
}

.stories .album-date {
  font-family: $body-font;
}

.user-status {
  background-color: #7fd222;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;

  &.offline {
    background-color: #606a8d;
  }

  &.idle {
    background-color: #dd1c20;
  }
}

.contacts .username {
  display: flex;
  flex: 1;
  align-items: center;
}

.right-search svg {
  width: 16px;
  height: 16px;
}

.right-search {
  padding-right: 10px;
  display: flex;
  align-items: center;
  border-top: 1px solid $border-color;
  position: sticky;
  bottom: 0;
  margin-top: auto;
}

.right-search input {
  padding-right: 10px;
}

.search-bar-svgs {
  color: #656679;
  display: flex;
}

.search-bar-svgs svg {
  margin-right: 16px;
}

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(#24273b, 0.8);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: 0.3s;

  @media screen and (max-width: 1210px) {
    &.active {
      z-index: 3;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}

.right-side-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border: 0;
  width: 52px;
  background-color: #1e2031;
  border-left: 1px solid $border-color;
  color: #fff;
  display: none;
  cursor: pointer;

  &:before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    background-color: #1b86f8;
    border: 2px solid #1e2031;
    top: 13px;
    right: 12px;
  }

  svg {
    width: 22px;
  }

  @media screen and (max-width: 1210px) {
    display: block;
  }
}


@media screen and (max-width: 700px) {
  .profile-avatar {
    top: -25px;
    left: 50%;
    transform: translatex(-50%);
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .profile-img {
    height: 100px;
    width: 100px;
  }
  .profile-name {
    margin: 5px 0;
  }
  .profile-menu {
    padding-left: 0;
    width: 100%;
    overflow: auto;
    justify-content: center;
  }
  .profile-menu-link {
    padding: 16px;
    font-size: 15px;
  }
}

@media screen and (max-width: 480px) {
  .profile-menu-link:nth-last-child(1),
  .profile-menu-link:nth-last-child(2) {
    display: none;
  }
}

::-webkit-scrollbar {
  width: 10px;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.01);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.11);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
`;

// 임시비밀번호전송_김윤지
const Findidpw = styled.div`
.body {
    width: 42rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    background-color: #778899;
    border-radius: 50px;
    box-shadow: 8px 8px 8px 8px black;
  }
  
  .topNum {
    display: flex;
    justify-content: center;
    align-items: center;
  
    img {
      width: 12rem;
      margin-bottom: 1rem;
    }
  }
  
  .findtopnav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  
    p {
      font-size: 2.6rem;
      margin: 0 0 1rem;
      font-weight: bold;
      /* color: #777; */
      color: black;
    }
  
    h3 {
      border-bottom: 2px black;
      text-align: center;
      color: black;
    }
  }
  
  .finfind {
    text-align: center;
    margin-top: 3rem;
  
    button {
      padding: 1.2rem 0;
      font-size: 1.6rem;
      font-weight: bold;
      color: white;
      width: 80%;
      border-radius: 10px;
      border: none;
      background: #483D8B;
      cursor: pointer;
    }
  }
`; //end 임시비밀번호전송_김윤지

// 이메일 찾기(성공)_김윤지
// SuckFindId
const FindId = styled.div`
.body {
    width: 42rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    background-color: #778899;
    border-radius: 50px;
    box-shadow: 8px 8px 8px 8px black;
    
  }
  
  .topNum {
    display: flex;
    justify-content: center;
    align-items: center;

    h2{
      font-size: 2.6rem;
    }
  
    img {
      width: 12rem;
      margin-bottom: 3rem;
    }
  }

  .twoBtn {
    justify-content: space-between;
  }
  
  h1 {
    font-size: 1.7rem;
    color: #555;
    text-align: center;
  }
  
  .twoKindBtn, .twoKindBtn2 {
    padding: 1.25rem 0;
    font-size: 1.6rem;
    font-weight: bolder;
    color: white;
    width: 48.5%;
    margin: 3.5rem 0 0;
    border-radius: 10px;
    border: 0;
    background: #483D8B;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .topNum {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  h1 span {
    color: #14c1c7;
    font-size: 1.9rem;
    margin: 0 0.5rem;
  }
  
  hr {
    margin-top: 2rem;
    color: #999;
  }
`;


// 비밀번호찾기_김윤지
const Findidpwcss2 = styled.div`
    * {
  text-decoration: none;
  box-sizing: border-box;
}

.tofind .red {
  color: rgb(128, 0, 0);
  font-size: 1.2rem;
  margin: 0;
  display: none;
}

.forheigth {
  margin-bottom: 1rem;
  height: 6.5rem;
}

input, textarea, button {
  padding: 0;
  outline: 0;
  border: 0;
  resize: none;
  border-radius: 0;
  -webkit-appearance: none;
  background-color: rgba(0, 0, 0, 0);
}

.body {
  background-color: #778899;
  border-radius: 50px;
  box-shadow: 8px 8px 8px 8px black;
  width: 42rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
}

.findtopnav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 1.6rem;
    font-weight: bold;
    color: #888;
    line-height: 3rem;
    word-break: keep-all;
    

  }

  h2 {
    color: #222;
    font-size: 2.6rem;
  }

  h3 {
    // 윤지
    border-radius: 15px;
    border-style: dashed;
    border-width: 5px;
    text-align: center;
    background-color: #D3D3D3;
    opacity: 0.4;
    color: black;
    // 윤지 끝
  }
}

.phinput input {
  border: 1px solid lightgray;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  height: 4.5rem;
  color: black;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  padding-left: 1rem;
}

input:hover {
  border: 1px solid #14c1c7;
}

.finregi {
  margin-top: 2rem;

  button {
    display: flex;
    padding: 1.2rem 0;
    font-size: 1.6rem;
    font-weight: bolder;
    color: white;
    width: 100%;
    border-radius: 10px;
    border: none;
    background: #483D8B;
    margin: 0 auto;
    justify-content: center;
    cursor: pointer;

    &:disabled {
      background: #E6E6FA;
    }
  }
}

.tofind p {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: #dfdfed;
}
`; //end 비밀번호찾기_김윤지

// 이메일 찾기 css
const FindidpwStyled = styled.div`
* {
    text-decoration: none;
    box-sizing: border-box;
  }
  
  input, textarea, button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .forheigth {
    margin-bottom: 0;
    height: 8.3rem;
  }
  
  .body {
    width: 42rem;
    //김윤지
    border-radius: 50px;
    padding: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //김윤지
    background-color: #778899;
    box-shadow: 8px 8px 8px 8px black;
    
  }
  
  .red {
    color: #800000;
    font-size: 1.2rem;
    margin: 0;
    font-style: bord;
  }
  
  .findtopnav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .logo_area {
    height: 50px;
  }

  .findtopnav_back {
    
    .h2 {
      margin-top: 50px;
      color: red;
    }
  }

  //김윤지
  .findComment {
    margin: 3rem 0;
    border-radius: 15px;
    border-style: dashed;
    border-width: 5px;
    text-align: center;
    background-color: #D3D3D3;
    opacity: 0.4;
    color: black;
  
    p {
      text-align: left;
      line-height: 3rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: #696969;
      margin: 0 0 0 1rem;
      word-break: keep-all;
    }
  }
  
  input:hover {
    border: 1px solid #14c1c7;
  }
  
  .findtopnav h2 {
    color: #222;
    font-size: 2.6rem;
    margin-bottom: 0;
  }
  
  .phinput input {
    border: none;
    background-color: #fff;
    width: 100%;
    height: 4.5rem;
    color: black;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding-left: 1rem;
    font-size: 1.5rem;
  }
  
  .finregi {
    margin-top: 1rem;
    
    //김윤지, 버튼
    // 주석
    button {
      display: flex;
      padding: 1.2rem 0;
      font-size: 1.6rem;
      font-weight: bolder;
      color: white;
      width: 100%;
      border: none;
      background: #483D8B;
      justify-content: center;
      cursor: pointer;
      border-radius: 25px;;

      
      //비활성화
      &:disabled {
        background: #E6E6FA;
      }
    }
  }
  
  .ph {
    font-size: 1.5rem;
    color: #dfdfed;
    
    
    p {
      margin-bottom: 0.8rem;
    }
  }
`;

const FormnotFound404 = styled.div`
height: 100%;
.spin-earth-on-hover {
  transition: ease 200s !important;
  transform: rotate(-3600deg) !important;
}

html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Dosis', sans-serif;
  font-weight: 300;
  user-select: none;

  /* Standard syntax */
}

.bg-purple {
  background: url(http://salehriaz.com/404Page/img/bg_purple.png);
  background-repeat: repeat-x;
  background-size: cover;
  background-position: left top;
  height: 100%;
  overflow: auto;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Dosis', sans-serif;
  font-weight: 300;
  user-select: none;

  /* Standard syntax */
}

.custom-navbar {
  padding-top: 15px;
}

.brand-logo {
  margin-left: 25px;
  margin-top: 5px;
  display: inline-block;
}

.navbar-links {
  display: inline-block;
  float: right;
  margin-right: 15px;
  text-transform: uppercase;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;

  /*    overflow: hidden;*/
  display: flex;
  align-items: center;
}

li {
  float: left;
  padding: 0px 15px;

  a {
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    letter-spacing: 2px;
    font-size: 12px;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    -ms-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;

    &:hover {
      color: #ffcb39;
    }
  }
}

.btn-request {
  padding: 10px 25px;
  border: 1px solid #FFCB39;
  border-radius: 100px;
  font-weight: 400;

  &:hover {
    background-color: #FFCB39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  }
}

.btn-go-home {
  position: relative;
  z-index: 200;
  margin: 15px auto;
  width: 100px;
  padding: 10px 15px;
  border: 1px solid #FFCB39;
  border-radius: 100px;
  font-weight: 400;
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 11px;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  -ms-transition: all 0.3s ease-in;
  -o-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #FFCB39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  }
}

.central-body {
  /*    width: 100%;*/
  padding: 17% 5% 10% 5%;
  text-align: center;
}

.objects img {
  z-index: 90;
  pointer-events: none;
}

.object_rocket {
  z-index: 95;
  position: absolute;
  transform: translateX(-50px);
  top: 75%;
  pointer-events: none;
  animation: rocket-movement 200s linear infinite both running;
}

.object_earth {
  position: absolute;
  top: 20%;
  left: 15%;
  z-index: 90;

  /*    animation: spin-earth 100s infinite linear both;*/
}

.object_moon {
  position: absolute;
  top: 12%;
  left: 25%;

  /*
      transform: rotate(0deg);
      transition: transform ease-in 99999999999s;
  */
}

.earth-moon {}

.object_astronaut {
  animation: rotate-astronaut 200s infinite linear both alternate;
}

.box_astronaut {
  z-index: 110 !important;
  position: absolute;
  top: 60%;
  right: 20%;
  will-change: transform;
  animation: move-astronaut 50s infinite linear both alternate;
}

.image-404 {
  position: relative;
  z-index: 100;
  pointer-events: none;
}

.stars {
  background: url(http://salehriaz.com/404Page/img/overlay_stars.svg);
  background-repeat: repeat;
  background-size: contain;
  background-position: left top;
}

.glowing_stars .star {
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  opacity: 0.3;
  will-change: opacity;

  &:nth-child(1) {
    top: 80%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 1s;
  }

  &:nth-child(2) {
    top: 20%;
    left: 40%;
    animation: glow-star 2s infinite ease-in-out alternate 3s;
  }

  &:nth-child(3) {
    top: 25%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 5s;
  }

  &:nth-child(4) {
    top: 75%;
    left: 80%;
    animation: glow-star 2s infinite ease-in-out alternate 7s;
  }

  &:nth-child(5) {
    top: 90%;
    left: 50%;
    animation: glow-star 2s infinite ease-in-out alternate 9s;
  }
}

@media only screen and (max-width: 600px) {
  .navbar-links {
    display: none;
  }

  .custom-navbar {
    text-align: center;
  }

  .brand-logo img {
    width: 120px;
  }

  .box_astronaut {
    top: 70%;
  }

  .central-body {
    padding-top: 25%;
  }
}
`;

export {Login, DelPopWrap, UploadForm, EditPopWrap, MyPageQnAListWrap, MyPageQnAWrap, MyPagePwWrap, MypageWrap, WithdrawWrap, MainTalkForm, MainForm, Findidpw, FindId, Findidpwcss2, FindidpwStyled, FormnotFound404};