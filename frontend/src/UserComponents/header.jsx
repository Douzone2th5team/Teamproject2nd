import React from "react";
import styled from "styled-components"; //css 사용할 때 import시켜줘야 함
import { Cookies } from "react-cookie"


const HeaderForm = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Water+Brush&display=swap');
.logout_tag{
    font-family: 'Water Brush', cursive;
    font-size: 38px;
    color: violet;
}
.home_text{
    font-family: 'Water Brush', cursive;
    font-size: 38px;
    color: violet;
    margin-left: 2rem;
}

.header_container {
    z-index: 100;
    position: fixed;
    border-bottom: 1px solid #8080803b;
    background: #151728;
    width: 100%;
    padding: 1rem 0;
  }
       
  .header_box {
    display: flex;
    align-items: center;
    max-width: 100rem;
    margin: 0 auto;
    justify-content: space-between;
  }
  
  .logo_box {
    vertical-align: middle;
    width: 5rem;
    cursor: pointer;
  }
  
  .logout_tag {
    width: 7rem;
    position: relative;
    top: 0.3rem;
    cursor: pointer;
  }
  
`;

const cookies = new Cookies();
const cookie = cookies.get('three');

const logout = async() =>{
    console.log(document.cookie)
    cookies.remove('three')
    cookies.remove('jwt_test')
    alert("로그아웃 되었습니다.")
    window.location.href="/"
}

const main = () =>{
    window.location.href=`http://localhost:3000/main?idx=${cookie}`
}
const Header = () =>{
    return (
        <HeaderForm>
            <div className="header_container">
                <div className="header_box">
                    <div className="logo_box">
                        <div className='home_text' onClick={main}>Home</div>
                    </div>
                    <div className="logout_box">
                        <div className='logout_tag' onClick={logout}>logout</div>
                    </div>
                </div>
            </div>
        </HeaderForm>
    );
} 

export default Header;