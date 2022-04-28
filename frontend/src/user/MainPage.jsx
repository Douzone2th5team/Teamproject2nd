import React, {useState, useEffect, useRef} from "react";
import Header from "../UserComponents/header";
import MainProfile from "../UserComponents/mainProfile";
import TalkList from "../UserComponents/talkList";
import PostPopStyle from "./postpopstyle";
import FriendList from "../UserComponents/friendlist";
import {Link} from "react-router-dom";
import axios from "axios";
import './mainStyled.scss'; // 오늘 메인 될 css
import {Cookies} from "react-cookie";
import AddFriendStyle from "./addfriendstyle";
// import PostList from "./postList";
import Post from "./posts";

const cookies = new Cookies();
const cookie = cookies.get('three');

const MainPage = (idx) => {
    const param = window.location.search.split('=')[1]  //회원의 id값
    const [post, setPost] = useState([]); // 게시물 정보
    const [rightSide, setRightSide] = useState("right-side");
    const [overLay, setOverLay] = useState("overlay");
    const [postOn, setPostOn] = React.useState(false); // 게시물 팝업1
    const [imgFile, setImgFile] = useState(null); // 게시물 업로드 파일 저장
    const [addOn, setAddOn] = React.useState(false);
    // 게시물 업로드 파일 저장
    const contentInput = useRef();
    //친구추가 팝업
    const [addFriends, setAddF] = useState(null);
    const [profile, setProfile] = useState({info: [0], postCnt: 0, friendCnt: 0, friend: [0]});
    const [email, setEmail] = useState('');
    const [btn, setBtn] = useState(true);
    let [friends, setFriends] = useState([]);
    let friendFor = [];
    const [friendOn, setFriendOn] = useState(false);
    let [list, setList] = useState([]);
    const [makeChatRooms, setMakeChatRoom] = useState(false);

    // 친구목록
    useEffect(() => {
        async function test() {
            const profile = await axios.get("http://localhost:3001/main?id=" + param)
            console.log(profile.data[3].friendInform.length);
            setProfile({
                info: profile.data[0].member[0],
                postCnt: profile.data[1].postCnt,
                friendCnt: profile.data[2].friendCnt,
                friend: profile.data[3]
            })
            const curr = profile.data[0].member[0].email.split('@');
            setEmail(curr[0])
            if (profile.data[3].friendInform.length > 8) {
                setBtn(false);
                for (let i = 0; i < profile.data[3].friendInform.length; i++) {
                    friendFor[i] = profile.data[3].friendInform[i]
                }
                setFriends(friendFor);
            } else {
                for (let i = 0; i < profile.data[3].friendInform.length; i++) {
                    friendFor[i] = profile.data[3].friendInform[i]
                }
                ;
                setBtn(true);
                setFriends(friendFor);
            }
        }

        test();
    }, [friendOn]);

    useEffect(() => {
        async function post() {
            console.log(param);
            const post = await axios.get("http://localhost:3001/main/post?idx=" + param);
            console.log(post.data[0]);
            setPost(post.data)
        }
        post();
    }, []);

    const rightSideView = (rightSide) => {
        setRightSide(rightSide)
    }

    const overLayView = (overLay) => {
        setOverLay(overLay)
    }

    const friendOpen = (e) => {
        e.preventDefault();
        if (rightSide == "right-side") {
            rightSideView("right-side active")
            overLayView("overlay active")
        } else {
            rightSideView("right-side")
            overLayView("overlay")
        }
    }

    // 게시물 올리기 팝업1(업로드될 이미지 선택 팝업)
    const onOpenPost = () => {
        setPostOn(!postOn);
        //팝업 창 띄울 시 body 스크롤
        if (postOn === false) {
            document.body.style.overflow = "hidden";
        } else if (postOn === true) {
            document.body.style.overflowY = "unset";
        }
    }

    // 게시물 close
    const closePop = () => {
        setAddOn(false);
        // document.body.style.overflowY = "unset";
    }

    //게시물 올리기 팝업2(선택한 이미지로 게시글 작성 팝업)
    const [postTxtOn, setPostTxtOn] = React.useState(false);
    const onOpenPostTxt = () => {
        setPostTxtOn(!postTxtOn);
        //팝업 창 띄울 시 body 스크롤
        if (postTxtOn === false) {
            document.body.style.overflow = "hidden";
        } else if (postTxtOn === true) {
            document.body.style.overflowY = "unset";
        }
    }

    // 게시물 등록 버튼 클릭 (axios 제출)
    const WriteBoard = async (e) => {
        const content = contentInput.current.value; //게시물의 게시글

        let formData = new FormData(); // 얘안됨
        console.log("확인1" + new FormData());
        console.log("확인2" + formData);
        console.log("확인3" + e);
        for (const key of Object.keys(imgFile)) {
            formData.append('fileupload', imgFile[key]);
        }
        // formData.append('memberIdx', cookie);
        formData.append('memberId', cookie);
        console.log("1확인" + formData.append.current);
        formData.append('content', content);
        console.log("2확인" + formData);
        return await axios.post(`http://localhost:3001/post/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            alert('게시물이 등록되었습니다.');
            // window.location.href = '/main?idx=' + cookie;
            window.location.href = '/main?id=' + cookie;
            // use
        });
    }

    //이미지 업로드 js 
    function handleFileSelect(evt) {

        setImgFile(evt.target.files);
        let fileSize = document.querySelectorAll(".prev_img");
        var files = evt.target.files;
        if (fileSize.length + files.length < 7) {
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image.*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.onload = (function (theFile) {
                    return function (e) {
                        var span = document.createElement('span');
                        span.innerHTML =
                            [
                                '<div class="prev_img" style="display: block;"><img style="width:100%; height:100%;" src="',
                                e.target.result,
                                '" title="', escape(theFile.name),
                                '"/><br><div class="img_del"><i class="fas fa-times-circle"></i></div></div>'
                            ].join('');

                        document.querySelector('.prev_upload').insertBefore(span, null);
                        const muti_img_list = document.querySelectorAll(".img_del");
                        for (let i = 0; i < muti_img_list.length; i++) {
                            muti_img_list[i].addEventListener('click', function () {
                                this.parentNode.remove();
                                console.log(i);
                            });
                        }
                    };
                })(f);
                reader.readAsDataURL(f);
            }
        } else {
            alert("사진은 6개까지 첨부 가능합니다");
        }
    }

    const Post2 = () => { // 게시글 내용
        return (
            <PostPopStyle>
                <div className="post2_pop_container">
                    <div className="post2_pop_box">
                        <div className="post2_pop_sec1">
                            <div><p className="wr_upload_txt">게시글 작성</p></div>
                            <div className="pop4_close">
                                <button className="pop4_close_btn" type="button" onClick={closePop}><img
                                    src="/img/clear_black.png" alt="close"/></button>
                            </div>
                        </div>
                        <div className="post2_pop_sec2">
                            <div className="post_input_txt_box">
                                <textarea className="post_input_txt" id="upload_textbox" maxLength="5000"
                                          ref={contentInput}/>
                            </div>
                            <div className="post_txt_btn_box">
                                {/* TODO */}
                                <button type="button" className="post_txt_btn" onClick={WriteBoard}>게시물 등록</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PostPopStyle>
        )
    }

    //업로드될 이미지 선택 팝업 html
    const Post1 = () => {
        return (
            <PostPopStyle>
                <div className="post1_pop_container">
                    <div className="post1_pop_box">
                        <div className="post1_pop_sec1_box">
                            <div className="post1_pop_sec1">
                                <div><p className="wr_upload_txt">게시글 작성</p></div>
                                <div className="pop4_close">
                                    <button className="pop4_close_btn" type="button" onClick={onOpenPost}><img
                                        src="/img/clear_black.png" alt="close"/></button>
                                </div>
                            </div>
                        </div>
                        <form id="form" multiple>
                            <div className="post1_pop_sec2_box">
                                <div className="post1_pop_sec2">
                                    <div className="filebox">
                                        <div className="file_aa">
                                            <div className="file_label">
                                                <label id="upload" htmlFor="files"><img
                                                    src="/img/add_photo.png"/></label>
                                            </div>
                                            <div className="upload_txt_box">
                                                <div className="upload_txt">업로드 할 이미지를 선택하세요.</div>
                                            </div>
                                        </div>
                                        <input type="file" id="files" multiple accept="image/png"
                                               onChange={handleFileSelect}/>
                                    </div>
                                    <div className="prev_upload_box">
                                        <div className="prev_upload"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="post1_pop_sec3_box">
                                <div className="post1_pop_sec3">
                                    {/* TODO */}
                                    <button className="upload_img_ch" type="button" onClick={onOpenPostTxt}>선택 완료
                                    </button>
                                    {postTxtOn ? <Post2/> : ""}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </PostPopStyle>
        );
    }

    useEffect(() => {
        async function getlist() {
            const list = await axios.get("http://localhost:3001/main/friend/list?idx=" + param)
            console.log(list.data);
            console.log(list.data.map(listData => (listData.id)));
            setList(list.data)
        }

        getlist();
    }, [addOn]);


    // const makeChatRoom = async (receiverIdx) => {
    //     // error? why?
    //     console.log(receiverIdx);
    //     console.log(cookie);
    //     await axios(`http://localhost:3001/main/insert_chat_room?receiverIdx=${receiverIdx}&senderIdx=${cookie}`).then((res) => {
    //         //     console.log(res);
    //         // window.location.href = '/main?idx='+cookie;
    //         alert('채팅방이 생성되었습니다.');
    //     });
    // }

    const codeBtn = async () => {
        // TODO : code로 친구추가 하는 방식
        let code = document.getElementById('codeInput')
        console.log('aa' + code.value)
        await axios({
            method: "post",
            url: `http://localhost:3001/main/friend`,
            data: {
                code: code.value,
                idx: param
            }
        })
            .then(log => {
                setAddF({info: log.data.result1[0], flag: log.data.flag})
                console.log(log.data.result1[0])
            })
    }
    const onAddFriend = async () => { //추가 버튼
        if (addFriends !== null && addFriends.info !== undefined) {
            console.log("최종" + addFriends.info.id)
            await axios({
                method: "post",
                url: `http://localhost:3001/main/insert_friend`,
                data: {
                    fIdx: addFriends.info.id,
                    idx: param
                }
            })
                .then(log => {
                    console.log(addFriends.flag)
                    debugger
                    alert('성공했습니다.');
                    window.location.reload();
                })
        }
        setAddF(null)
        setAddOn(!addOn);
    }
    const onAddFriend2 = async () => { //추가 취소 버튼
        setAddF(null)
        setAddOn(!addOn);
    }

    function sendSetting(){
        window.location.href='http://localhost:3000/mypage'
    }

    const AddFriend = () => {
        return (
            <AddFriendStyle>
                <div className="add_pop_container">
                    <div className="add_friend_pop_box">
                        <div className="add_friend_pop_sec1_box">
                            {/*<img src="img/loginback.jpg" style={{width: '3rem'}}/>*/}
                            <p>친구추가</p>
                            <input className="input_friend_code" type="text" id="codeInput"/>
                            <button type="button" class="select_friend_btn" onClick={codeBtn}>검색</button>
                            <button type="button" style={{cursor:'pointer', border:'0', outline:'0', background:'white'}}>
                                <img src='img/close_icon.svg' alt='나가기' onClick={closePop}></img>
                            </button>
                        </div>
                        <div className="add_friend_pop_sec2">
                            {addFriends !== null ?
                                addFriends.info === undefined ?
                                    <div className="code_notFind_box">
                                        <p className="code_notFind">해당 이름의 회원님을 찾을 수 없습니다.</p>
                                    </div>
                                    :
                                    <div className="code_find_box">
                                        <div className="find_profile">
                                            <img className="find_profile_img"
                                                 src={addFriends.info.img !== null ? '/' + addFriends.info.img : '/img/none/noneImg.png'}
                                                 alt="일치 프로필"/>
                                        </div>
                                        <div className="find_profile_name_box">
                                            <p className="find_profile_name">{addFriends.info.name}</p>
                                        </div>
                                        <div className="find_profile_m_box">
                                            <p className="find_profile_m">{addFriends.info.message !== null || addFriends.info.message !== "null" ? addFriends.info.message : '-'}</p>
                                        </div>
                                    </div>
                                :
                                <div className="code_notFind_box">
                                    <p className="code_notFind">상단에 이름을 입력 후<br/>검색을 눌러주세요</p>
                                </div>
                            }
                        </div>
                        <div className="add_friend_pop_sec3">
                            <div className="ok_cancel_box">
                                {addFriends !== null && addFriends.info !== undefined && addFriends.info.id !== profile.info.id ?
                                    <div className="ok_box">
                                        <button className="ok_btn" type="submit"
                                                onClick={onAddFriend}>{addFriends.flag === true ? '해제' : '추가'}</button>
                                    </div>
                                    : <></>
                                }
                                <div className="cancel_box">
                                    <button className="cancel_btn" type="button" onClick={onAddFriend2}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AddFriendStyle>
        );
    }

    return (
        <>
            <Header idx={param}/>
            <div>
                <div className="container">
                    <div className="main">
                        {/* main start */}
                        <div className="main-container">
                            <button className='right-side-button' onClick={friendOpen}>
                                <img className='right-side-action-button' src='img/arrow_mark.png'/>
                            </button>
                            <MainProfile idx={param}/>
                            {/* { // 친구 게시판 화면으로 접속했을 때 로딩
                                !(cookie === param) ?
                                    <button onClick={() => {
                                        makeChatRoom(param)
                                    }}>얘랑 채팅하실?</button>
                                    : <></>
                            } */}
                            <div className="timeline">
                                <div className="timeline-right">
                                    {/* album box -> 게시판으로 구현 */}
                                    <div className="album box">
                                        {/* 업로드 게시물 영역? */}
                                        <div className="album-content">
                                            <Post>
                                                <ul className="cards">
                                                    {post.length !== 0 ?  //post가 있으면
                                                        post.map((postData, index) => (
                                                            <>
                                                            <li className="card" src={'uploads/' + postData.imgName}>
                                                                <Link className="card__link"
                                                                      to={"/uploadPage/" + postData.postId}>
                                                                    <img className="imgst" src={'uploads/' + postData.imgName} />
                                                                <div
                                                                    className={(index + 1) % 3 === 0 ? 'last_box' : 'box'}>
                                                                </div>
                                                                </Link>
                                                            </li>
                                                            </>
                                                        )) : <></>
                                                    }
                                                </ul>
                                            </Post>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {postOn ? <Post1/> : ""}{addOn ? <AddFriend/> : ""}
                    <div className={rightSide}>
                        <div className="account">
                            <button className="account-button">
                                {/* 게시물 event걸기 */}
                                <div style={{color: 'white'}} onClick={onOpenPost}>게시물</div>
                            </button>
                            <button className="account-button">
                                {/* 친구추가 event걸기 */}
                                <div style={{color: 'white'}} onClick={onAddFriend}>친구추가</div>
                            </button>
                            <button className="account-button">
                                <div style={cookie === param ? {display: 'flex'} : {display: 'none'}} onClick={sendSetting} >설정</div>
                            </button>
                        </div>
                        {/* 친구목록 뿌리기 */}
                        <div className="side-wrapper contacts">
                            {/* 여기서 뿌리면 될듯 */}
                            <div className="side-title">친구 목록</div>
                            <FriendList idx={cookie}/>

                        </div>

                        {/* 채팅방 친구유저 뿌려주기 */}
                        <div className="side-wrapper contacts">
                            <div className="side-title">채팅방 목록</div>
                            <TalkList idx={cookie}/>
                        </div>
                    </div>
                </div>
                <div className={overLay} onClick={friendOpen}></div>
            </div>
        </>
    );
}

export default MainPage;