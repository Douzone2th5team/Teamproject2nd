import styled from "styled-components";

const MainProfileWrap = styled.div`
input:focus, textarea:focus {
    outline: none;
  }
  
  // 메인 css //
  background-image: url(".././images/preview.gif");
  background-repeat: no-repeat;
  .section1_box {
    display: flex;
    align-items: center;
    margin: 3.8rem 0 0 3rem
  };
  
  .profile_layer1 {
    display: flex;
    align-items: center;
  }
  
  .profile_layer2 {
    display: flex;
    height: 3.3rem;
  }
  
  .profile_layer1 p, .status_message p {
    margin: 0;
  }
  
  .phone_name p {
    margin: 1rem 0;
  }
  
  .profile_img_box {
    width: 17rem;
    height: 17rem;
  }
  
  .profile_img {
    width: fit-content;
    min-width:50px;
    max-width:100px;
    border-radius: 50%;
    border-width: 0;
    margin: 5px 25px; 
    padding: 0;
  }
  
  .option_box {
    cursor: pointer;
    margin: 0 1rem;
  }
  
  .post_btn {
    border-radius: 5px;
    background-color: #660000;
    color: white;
    border: none;
    height: 3rem;
    cursor: pointer;
  }
  
  .nikname_box {
    font-size: 2.8rem;
    color: white;
  }
  
  .friend_cnt_box {
    margin-left: 1.6rem;
    font-size: 1.8rem;
    display: flex;
  }
  
  .posting_cnt_box {
    font-size: 1.8rem;
    color: white;
    display: flex;
    cursor: pointer;
  }
  
  .profile_layer3 {
    // margin-top: 3rem;
  }
  
  .name {
    font-size: 1.8rem;
    font-weight: bold;
  }
  
  .status_message {
    font-size: 1.5rem;
    margin-top: 2rem;
    cursor: pointer;
  }
  
  .section2_container {
    display: flex;
    padding-bottom: 10rem;
  }
  
  .section2_box {
    display: flex;
    margin-top: 5rem;
    width: 90rem;
    margin: 5rem auto 0;
  }
  
  .phone_profile {
    width: 8.5rem;
    height: 8.5rem;
    border-radius: 50%;
    border: 3px solid lightgray;
    cursor: pointer;
  }
  
  .phone_name {
    text-align: center;
    font-weight: 600;
    font-size: 1.4rem;
    cursor: pointer;
  }
  
  .posting_cnt {
    margin-left: 0.8rem;
    font-weight: 600;
  }
  
  .usually_contect {
    width: 8.5rem;
    margin: 0 1.35rem;
  }
  
  .arr_btn {
    background: none;
    border: none;
    padding: 0;
  }
  
  .arr_img {
    width: 6rem;
    cursor: pointer;
  }
  
  .arr_box {
    position: relative;
  }
  
  #next {
    position: absolute;
    right: 0;
    bottom: 15rem;
  }
  
  #prev {
    position: absolute;
    bottom: 15rem;
  }
  
  .sec_post_box {
    display: flex;
    color: white;
  }
  
  .sec_chat_box {
    display: flex;
    color: white;
    margin-left: 4rem;
  }
  
  .section3_box {
    border-top:1px solid #c8c8c8;
    border-bottom:1px solid #c8c8c8;
    display: flex;
    margin-top: -6rem;
    justify-content: center;
  }
  
  .sec_chat_img {
    margin-top: 1.6rem;
  }
  
  .sec_post_img {
    margin-top: 1.5rem;
  }
  
  .sec3_img1, .sec3_img2 {
    width: 1.7rem;
  }
  
  .sec_post_title {
    font-size: 1.3rem;
  }
  
  .sec_chat_title {
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
  
  .post_link:active {
    font-weight: 700;
  }
  
  .nomatch {
    display: none;
  }

  .friend_btn { // 메인 친구추가 버튼
    color: white;
    background: none;
    border: none;
    font-size: 1.8rem;
    margin-top: 1.7rem;
    cursor: pointer;
  }
  .mainprofile_name{
    color: white;
    float:left
  }
  .mainprofile_email{
    color: white;
    clear: left;
  }
  .inviteChat{
    width: 32px;
    margin-left: 0.5rem;
    cursor:pointer;
  }
  .chattingButton{
    margin-reft: 2rem;
  }

`;

export default MainProfileWrap;