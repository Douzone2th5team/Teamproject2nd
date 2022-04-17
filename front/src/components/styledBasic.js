import styled from "styled-components";

const Login = styled.div`
input, textarea {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  
  button {
    padding: 0;
    outline: 0;
    border: 0;
    resize: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .body {
    width: 38rem;
    padding: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  
    img {
      width: 12rem;
    }
  }
  
  .login_top input {
    border-radius: 12px;
    width: 37rem;
    height: 4.6rem;
    margin-bottom: 0.5rem;
    border: 1px solid lightgray;
    font-size: 1.4rem;
    background-color: #fff;
    padding-left: 1rem;
    caret-color: #14c1c7;
  
    &:hover {
      border: 1px solid #14c1c7;
    }
  }
  
  .login_btn2 {
    display: flex;
    align-items: baseline;
    cursor: pointer;
    justify-content: space-between;
  }
  
  .signup, .find {
    background: #14c1c7;
    width: 18.5rem;
    color: white;
    border: none;
    font-size: 1.4rem;
    padding: 1.2rem 0;
    font-weight: 600;
  }
  
  .login_btn_box {
    margin-top: 2rem;
  }
  
  .login_btn1 {
    border-radius: 10px;
    border: none;
    background: #14c1c7;
    width: 100%;
    padding: 1.1rem 0;
    font-size: 1.6rem;
    color: white;
    margin-bottom: 5px;
    font-weight: 600;
  
    &:disabled {
      background: #dfdfdf;
    }
  }
  
  .forheigth {
    height: 65px;
  }
  
  .login-text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .red {
    color: red;
    font-size: 1.2rem;
    margin: 0 0 0 0.7rem;
  }
`;

const MainForm = styled.div`
* {
    text-decoration: none;
  }
  
  .container {
    padding-top: 1.5rem;
    max-width: 100rem;
    margin: 0 auto;
  }
  
  .sec_post_box {
    border-top: 1.5px solid #222;
  }
  
  .social_box {
    display: flex;
    flex-wrap: wrap;
  }
  
  .social1_img {
    width: 31.5rem;
    height: 31.5rem;
    cursor: pointer;
  }
  
  .social_layer {
    padding-bottom: 8rem;
  }
  
  .slide_box {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
  }
  
  .fa-copy {
    font-size: 2.2rem;
    color: #59f9ff;
  }
  
  .box, .last_box {
    margin-bottom: 2rem;
    position: relative;
  }
  
  .box {
    margin-right: 2.75rem;
  }
  
  .last_box {
    margin: 0;
  }
`;

export {Login, MainForm};