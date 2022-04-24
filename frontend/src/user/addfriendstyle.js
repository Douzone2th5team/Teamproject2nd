import styled from "styled-components";

const AddFriendStyle = styled.div`
// 친구추가 팝업1 css //
  
  .friend_pop_container {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .friend_pop_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: none;
    width: 33rem;
    height: 44rem;
    border-radius: 15px;
    padding: 1rem 0 1rem 1rem;
  }
  
  .pop_sec1 {
    display: flex;
    justify-content: space-between;
  }
  
  .pop_sec1_add_box {
    display: flex;
    align-items: center;
  }
  
  .friend_btn {
    color: white;
    background: none;
    border: none;
    font-size: 1.8rem;
    margin-top: 1.7rem;
    cursor: pointer;
  }
  
  .pop1_close {
    margin: 0 0.5rem 0 0;
  }
  
  .pop1_close_btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .pop_sec1_add_title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .pop_sec2_box {
    display: flex;
    justify-content: space-between;
    height: 5rem;
    margin-bottom: 1.3rem;
  }
  
  .pop_sec2_friend_box {
    display: flex;
  }
  
  .pop_sec2_friend_profile_img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 2px solid lightgray;
    cursor: pointer;
  }
  
  .pop_sec2 {
    margin-top: 1.5rem;
    overflow: auto;
    height: 37.8rem;
  }
  
  .pop_sec2_friend_detail_box {
    margin: 0.8rem 1.3rem;
  }
  
  .pop_sec2_friend_detail_m {
    font-size: 1.4rem;
  }
  
  .chat_img_box {
    display: flex;
    align-items: center;
    padding-right: 0.8rem;
  }
  
  .chat_img {
    width: 2.8rem;
    cursor: pointer;
  }
  
  .detail_n, .detail_m {
    margin: 0;
    cursor: pointer;
  }
  
  .detail_n {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .detail_m {
    width: 18rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .person_add_btn {
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .pop_no_friend_box {
    width: calc(100% - 1rem);
    height: 92%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  // 친구추가 팝업2(코드 불일치) css //
  
  .add_pop_container {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  .add_friend_pop_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: none;
    width: 33rem;
    height: 44rem;
    border-radius: 15px;
    padding: 1rem 0 1rem 1rem;
  }
  
  .add_friend_pop_sec1_box {
    width: calc(100% - 1rem);
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .ok_cancel_box {
    display: flex;
    justify-content: center;
    width: calc(100% - 1rem);
  }
  
  .input_friend_code {
    border: none;
    border-bottom: 1px solid;
    margin: 0 1.2rem 0 1rem;
    font-size: 1.8rem;
    text-align: center;
    width: 17rem;
  }
  
  .code_notFind {
    font-size: 1.5rem;
    width: 18rem;
    text-align: center;
    margin: 15rem auto;
  }
  
  .ok_btn, .cancel_btn {
    cursor: pointer;
    padding: 0.8rem 2rem;
    background-color: #191970;
    box-shadow: 2px 2px 2px 2px gray;
    color: white;
    border-radius: 5px;
    border: none;
  }
  
  .cancel_box {
    margin-left: 0.3rem;
  }
  
  .ok_box {
    margin-right: 0.3rem;
  }
  
  .select_friend_btn { // 검색 button
    background: white;
    padding: 0 1rem;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }
  
  //친구추가 팝업3(코드일치) css  //
  
  .code_find_box {
    display: block;
    width: calc(100% - 1rem);
    padding: 7.5rem 0 5.5rem;
  }
  
  .find_profile_img {
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    border: 3px solid lightgray;
    cursor: pointer;
  }
  
  .find_profile {
    display: flex;
    justify-content: center;
  }
  
  .find_profile_m {
    text-align: center;
    width: 85%;
    font-size: 1.4rem;
    margin: 1rem auto 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  
  .find_profile_name {
    text-align: center;
    margin: 1rem 0 0.5rem 0;
    font-weight: bold;
    cursor: pointer;
  }`

  export default AddFriendStyle;