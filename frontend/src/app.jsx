import React from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {Cookies} from "react-cookie";

// 사용자
import MainPage from './user/MainPage';
import MainTalkPage from './user/mainTalkPage';
import SignInPage from './user/SignInPage';
import FindIdPage from './user/FindIdPage';
import FinishIdPage from './user/FinishIdPage';
import FindPwPage from './user/FindPwPage';
import FinishPwPage from './user/FinishPwPage';
import Mypage from './user/mypage';
import MypagePw from './user/mypagePw';
import MypageQnA from './user/mypageQnA';
import MypageQnAList from './user/mypageQnAList';
import UploadPage from './user/uploadPage';
import NotFound from "./user/NotFound";

function App() {

  const cookies = new Cookies();
  const cookie = cookies.get('three');

    console.log(!!cookie)
  if(!!cookie){
      return (
          <>
              <Helmet>US</Helmet>
              <Router>
                  <Routes>
                      {/* 사용자 */}
                      <Route path={"/main"} element={<MainPage/>}/>
                      <Route path={"/maintalk"} element={<MainTalkPage/>}/>
                      <Route path={"/mypage"} element={<Mypage/>}/>
                      <Route path={"/mypagePw"} element={<MypagePw/>}/>
                      <Route path={"/mypageQnA"} element={<MypageQnA/>}/>
                      <Route path={"/mypageQnAList"} element={<MypageQnAList/>}/>
                      <Route path={"/uploadpage/:idx"} element={<UploadPage/>}/>
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </Router>
          </>
      )
  }else{
      return (
          <>
              <Helmet>US</Helmet>
              <Router>
                  <Routes>
                      {/* 사용자 */}
                      <Route path={"/"} element={<SignInPage/>}/>
                      <Route path={"/FindIdPw"} element={<FindIdPage/>}/>
                      <Route path={"/FindIdPw2"} element={<FindPwPage/>}/>
                      <Route path={"/FinFindidpw"} element={<FinishPwPage/>}/>
                      <Route path={"/SuchFindId/:email"} element={<FinishIdPage/>}/>
                      <Route path="*" element={<SignInPage/>}/>
                  </Routes>
              </Router>
          </>
      )
  }
}

export default App;
