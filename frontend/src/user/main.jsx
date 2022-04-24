// import React, { useState, useEffect } from "react";
// import Header from "../UserComponents/header";
// import MainProfile from "../UserComponents/mainProfile";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {MainForm} from "./pageStyleBasic"




// const MainPage = () =>{
//     const param = window.location.search.split('=')[1]  //회원의 id값
//     const [post, setPost] = useState([]);
    
//     useEffect(() => {
//         async function post () {
//           console.log(param);
//             const post = await axios.get("http://localhost:3001/main/post?idx=" + param);
//             console.log(post.data);
//             setPost(post.data)
//         }
//         post();
//     }, []);
//     console.log("post : "+post);
//     console.log("!post : "+!post);
//     return (
//         <>
//         <Header idx={param}/>
//         <MainForm>
//             <div className="container">
//                 <MainProfile idx={param}/>
//                 <div className="section4_box">
//                     <div className="social_layer">
//                         <div className="social_box">
//                             {post.length !== 0 ?  //post가 있으면
//                                 post.map((postData, index)=>(
//                                     <div className={(index+1)%3===0?'last_box':'box'}>
//                                         <Link to={"/uploadPage/"+postData.postId}>
//                                             <div className="social1">
//                                                 {/* <img className="img/loginback.jpg" alt="hi" src={'./img/'+postData.imgName}/> */}
//                                                 <img alt="hi" src={'/uploads/'+postData.imgName}/>
//                                             </div>
//                                             {postData.cnt>1?
//                                             <div className="slide_box"><i class="far fa-copy"></i></div>:<></>
//                                             }
//                                         </Link>
//                                     </div>
//                                 )):<></>
//                             }
//                         </div>
//                         {/* TODO :  post? 삼항 연산자 설정 어캐할지 data 확인, post가 없으면 */}
//                         {post.length === 0 ? 
//                             <div style={{textAlign: "center", fontSize: "1.5rem", padding: "10rem", color: "Gray"}}>업로드된 게시물이 없습니다. 게시물을 올려보세요.
//                               <img className="img/loginback.jpg" alt="hi"></img>
//                             </div>
//                             : <></>
//                         }
//                     </div>
//                 </div>
//             </div>
//         </MainForm>
//         </>
//     );
// } 

// export default MainPage;