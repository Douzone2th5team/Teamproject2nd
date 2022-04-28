import styled from "styled-components";

const TalkStyle = styled.div`
*{
  z-index:100;
}
img {
    width: 30px; // 50px였음
    // height: 100%; // 추가
}
.kWQFpX .talkBox {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
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
  
  .talkBox {
    position: fixed;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    background: #aee7e2;
    border: 1px solid rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 93%;
    border: 3px solid #cccccc;
  }
  .talkHeader {
    display: flex;
    align-items: center;
    padding: 2rem;
    background-color: rgb(0 0 0 / 8%);
    height: 5rem;
  }
  
  .recieverName {
    align-items: center;
    margin-left: 2rem;
    font-size: 1.75rem;
    font-weight: 800;
    color: rgba(54, 54, 54);
  }
  
  .talkToggle {
    margin-left: auto;
    margin-right: 1rem;
    position: relative;
  
    > img {
      width: 3rem;
      height: 2.7rem;
      cursor: pointer;
    }
  }
  
  .talkExitPop {
    position: absolute;
    width: max-content;
    top: 5rem;
    background-color: #fff;
    padding: .7rem 2.5rem;
    border: 1px solid rgb(0 0 0 / 8%);
    cursor: pointer;
    display: none;
  
    &:hover {
      background-color: rgb(236, 236, 236);
    }
  }
  
  .talkProfileImg {
    width: 5.5rem;
    cursor: pointer;
  }
  
  .talkList {
    overflow-y: scroll;
    padding: 2rem;
    padding-bottom: 0;
    height: 38rem;
  }
  
  .reciverTalk {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
  
  .talkContents .talkProfileImg {
    width: 6.5rem;
  }
  
  .talkDetailWrap {
    margin-left: 1rem;
    max-width: 50%;
    margin-top: 1rem;
  }
  
  .talkProfileName {
    margin-bottom: .5rem;
    font-weight: 600;
  }
  
  .talkDetailList {
    margin-left: .5rem;
    padding: .7rem;
    border-radius: .5rem;
    word-break: break-all;
    line-height: 2.5rem;
    box-shadow: 2px 2px 2px #c2c2c2;
  }
  .STalkDetailList {
    margin-left: .5rem;
    background:#c6e3fa;
    color:black;
    padding: .7rem;
    border-radius: .5rem;
    word-break: break-all;
    line-height: 2.5rem;
    box-shadow: 2px 2px 2px #c2c2c2;
  }
  
  .senderTalk {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
  
  .talkSendWrap {
    padding: 2rem;
    position: relative;
    background-color: #fff;
  }
  
  .talkTextInput {
    height: 7rem;
    width: 80%;
    font-family: "Nanum Gothic", sans-serif;
    box-shadow: 2px 2px 2px 2px #e7e6e6;
    border-radius: 5px;
    padding: 1rem;
  }
  
  .talkSendBtn {
    display: inline-block;
    position: absolute;
    top: 2.1rem;
    right: 2rem;
    background-color: rgb(204, 204, 204);
    color: #fff;
    padding: 1rem;
    border: 1px solid rgb(0 0 0 / 10%);
    border-radius: 5px;
    cursor: pointer;
    width: 6.5rem;
    height: 9rem;
  
    &:hover {
      box-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
      color: white;
      background-color: #14c1c7;
    }
  
    &.active {
      color: #333;
    }
  }
  #mw_temp {
    margin-left: 380px;
    z-index: 101;
    position: fixed;
    width: 550px;
    height: 600px;
    background: #c6e3fa;
    border-radius: 10px;
  }
  .fg {
    background: #b1cde3;
    width: 100%;
    text-align: center;
    border-bottom:2px solid #337AB7;
  }
  .closeBtn {
    float:right;
  }
  .selectfriendclose {
    width: 40px;
    height: 40px;
    margin: 1px;
    font-size: 20px;
  }
  .modalTitle {
    color: white;
    font-size: 40px;
    margin: 0 0 0 15px;
  }
  .searchName {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  #decFriend {
    background:white;
    height: 40px;
  }
  .test {
    margin-bottom: 5px;
  }
  .cs-message-input {
    margin-bottom: 10px;
  }
  #decFriend {
    border-radius:0.7em;
    width:250px;
  }
  .findForm {
    color:white;
    font-size: 30px;
    text-align: center;
  }
  .findForm p img {
    width:200px;
  }
  .cancel_btn {
    cursor: pointer;
    padding: 0.8rem 2rem;
    background-color: #191970;
    box-shadow: 2px 2px 2px 2px gray;
    color: white;
    border-radius: 5px;
    border: none;
  }
  .fg {
    border-radius: 10px;
  }
`

export default TalkStyle;