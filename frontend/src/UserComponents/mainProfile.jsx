import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import MainProfileWrap from './mainProfilestyle';
import {Cookies} from "react-cookie"


const cookies = new Cookies();
const cookie = cookies.get('three');

const MainProfile = (idx) => {
    console.log(idx);
    const [profile, setProfile] = useState({info: [0], postCnt: 0, friendCnt: 0, friend: [0]});
    const [email, setEmail] = useState('');
    const [btn, setBtn] = useState(true);
    let [friends, setFriends] = useState([])
    let friendFor = [];
    let [friendPage, setFPage] = useState(0);
    const [friendOn, setFriendOn] = useState(false);
    // 게시물 업로드 파일저장
    const [imgFile, setImgFile] = useState(null);
    const contentInput = useRef();

    // TODO : 친구목록 코드 개판이라 수정해야함
    // user 프로필가져오기
    useEffect(() => {
        async function test() {
            const profile = await axios.get("http://localhost:3001/main?id=" + idx.idx)
            console.log(profile.data[3].friendInform.length);
            setProfile({
                info: profile.data[0].member[0],
                postCnt: profile.data[1].postCnt,
                friendCnt: profile.data[2].friendCnt,
                friend: profile.data[3]
            })
            console.log(profile.data[0]);
            const curr = profile.data[0].member[0].email;
            setEmail(curr);
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

    // 상단 친구목록 버튼
    // TODO : 얘도 개판임
    const prev = () => {
        for (let i = 0; i < 8; i++) {
            friendFor[i] = profile.friend[i];
        }
        setFriends(friendFor);
        setFPage(0);
    }
    const next = () => {
        let j = 0;
        for (let i = 8; i < profile.friend.length; i++) {
            friendFor[j] = profile.friend[i];
            j++
        }
        setFriends(friendFor);
        setFPage(1);
    }

    //친구추가 목록 팝업
    const onOpenFriend = () => {
        setFriendOn(!friendOn);
        //팝업 창 띄울 시 body 스크롤
        if (friendOn === false) {
            document.body.style.overflow = "hidden";
        } else if (friendOn === true) {
            document.body.style.overflowY = "unset";
        }
    }
    let [list, setList] = useState([]);
    const [addOn, setAddOn] = React.useState(false);

    // 친구목록 불러오기
    useEffect(() => {
        async function getlist() {
            const list = await axios.get("http://localhost:3001/main/friend/list?idx=" + idx.idx)
            console.log(list.data);
            console.log(list.data.map(listData => (listData.id)));
            setList(list.data)
        }

        getlist();
    }, [addOn]);

    //친구추가 팝업
    const [addFriends, setAddF] = useState(null);

    const codeBtn = async () => {
        // TODO : code로 친구추가 하는 방식
        let code = document.getElementById('codeInput')
        console.log('aa' + code.value)
        await axios({
            method: "post",
            url: `http://localhost:3001/main/friend`,
            data: {
                code: code.value,
                idx: idx.idx
            }
        })
            .then(log => {
                setAddF({info: log.data.result1[0], flag: log.data.flag})
                console.log(log.data.result1[0]);
                window.location.reload();
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
                    idx: idx.idx
                }
            })
                .then(log => {
                })
        }
        setAddF(null)
        setAddOn(!addOn);
    }
    const onAddFriend2 = async () => { //추가 취소 버튼
        setAddF(null)
        setAddOn(!addOn);
    }

    //게시물 올리기 팝업1(업로드될 이미지 선택 팝업)
    const [postOn, setPostOn] = React.useState(false);
    const onOpenPost = () => {
        setPostOn(!postOn);
        //팝업 창 띄울 시 body 스크롤
        if (postOn === false) {
            document.body.style.overflow = "hidden";
        } else if (postOn === true) {
            document.body.style.overflowY = "unset";
        }
    }

    const closePop = () => {
        setAddOn(false);
        // document.body.style.overflowY = "unset";
    }

    //게시물 올리기 팝업2(선택한 이미지로 게시글 작성 팝업)
    //이미지 안 받아짐.
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

    // 채팅방 만들기 axios
    const makeChatRoom = async (receiverIdx) => {
        await axios(`http://localhost:3001/main/insert_chat_room?receiverIdx=${receiverIdx}&senderIdx=${cookie}`).then((res) => {
            // window.location.href = '/main?idx=' + cookie;
        });
    }

    //main html(전체적으로 보여지는 부분)
    return (
        <MainProfileWrap>
            <div className="profile">
                <div className="profile-avatar">
                    <img className="profile_img"
                         src={profile.info.img !== null ? "/" + profile.info.img : '/img/none/noneImg.png'}
                         alt="profile"/>

                    <div className="profile_detail_box">
                        <div className="profile_layer3">
                            <div className="name">
                                <div className="mainprofile_name">
                                    {profile.info.name}
                                </div>
                                { // 친구 게시판 화면으로 접속했을 때 로딩
                                    !(cookie === idx.idx) ?
                                        <div className="chattingButton">
                                            <img className="inviteChat" src='img/chat-icon.png' onClick={() => {
                                                makeChatRoom(idx.idx)
                                            }}/>
                                        </div>
                                        : <br/>
                                }
                            </div>
                        </div>
                        <div className="profile_layer1">
                            <div className="name">
                                <p className="mainprofile_email">{email}</p>
                            </div>
                        </div>
                        {/* <div className="profile_layer4">
                        <div className="status_message">
                            <p>{profile.info.message!==null?profile.info.message!=="null"?profile.info.message:"등록된 소개가 없습니다.":"등록된 소개가 없습니다."}</p>
                        </div>
                    </div> */}
                    </div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                    alt="" className="profile-cover"/>
            </div>
        </MainProfileWrap>
    );

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

}

export default MainProfile;