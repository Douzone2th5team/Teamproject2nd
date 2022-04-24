// import {Link} from "react-router-dom";
// import React, {useState, useEffect} from "react";
// import axios from "axios";
// import styled from "styled-components";
// const Test = styled.div`
// .Cards{
//     display:flex;
//     flex-wrap:wrap;
//       flex-direction:row;
//      width:100%;
//     }
    
//     .card {  
//       box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//       max-width: 300px;
//       height:400px;
//       margin: 20px;  
//       text-align:center;
//       font-family: arial;
//       overflow:auto;
//     }
    
//     .imgRes{
//       width:280px;
//       max-height:60%;
//     }`

// const PostList = (param) => {
//     const [post, setPost] = useState([]); // 게시물 정보

//     useEffect(() => {
//         async function post() {
//             console.log(param);
//             const post = await axios.get("http://localhost:3001/main/post?idx=" + param);
//             console.log(post.data);
//             setPost(post.data)
//         }

//         post();
//     }, []);

//     return(
//     <Test>
//     {post.length !== 0 ?  //post가 있으면
//         post.map((postData, index)=>(
//         <div className="Cards" style={{ width: '18rem' }}>
//             <div className="card">
//                 <Link to={"/uploadPage/"+postData.postId}>
//             <img className="imgRes" variant="top" src={'./img/'+postData.imgName} />
//             </Link>
//             <div className={(index+1)%3===0?'last_box':'box'}>
//             {/* <Link to={"/uploadPage/"+postData.postId}> */}
//             <img className="img/loginback.jpg" alt="hi" src={'./img/'+postData.imgName}/>
//             {/* <img alt="hi" src={'/uploads/'+postData.imgName}/> */}
//                 {/* {postData.cnt>1?
//                     <div className="slide_box"><i class="far fa-copy"></i></div>:<></>
//                 } */}
//             {/* </Link> */}
//             </div>
//         </div>
//     </div>
//         )):<></>
//     }
//     </Test>
//     )
// }
// export default PostList;