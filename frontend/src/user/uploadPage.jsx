import React, { useState, useRef, useEffect } from "react";
import Header from "../UserComponents/header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import{ EditPopWrap, UploadForm, DelPopWrap } from "./pageStyleBasic"
import {Cookies} from "react-cookie";

let img = 0;
const cookies = new Cookies();
const cookie = cookies.get('three');
const UploadPage = () => {

    const id = useParams(); // 받아온 id값 저장
    const [email, setEmail] = useState('');
    let [detail, setDetail] = useState({postInfo:[0], postImg:[0], postReply:[0]});
    let [detailImg, setDetailImg] = useState(0);
    let [scrollImg, setScrollImg ] = useState(''); //이미지 뜨게
    const [content, setContent] = useState('');  //content 내용 뜨게
    
    // 대댓글 댓글idx, 그룹idx
    const [reReIdx, setReReIdx] = useState(null);
    const [reReGroupIdx, setReReGroupIdx] = useState(null);
    const [reReName, setReReName] = useState(null);
    // 내용 업데이트 상태
    const [isUpdate, setIsUpdate] = useState(0);
    // 댓글 입력 textarea
    const replyValue = useRef();
    // 게시물 수정 textarea
    const editContent = useRef();
    // 게시물 수정 파일저장
    const [imgFile, setImgFile] = useState(null);
    
    // 댓글 화면 렌더링 수정..
    // useEffect(async () => { // detail-useEffect
    //     const info = await axios.get("http://localhost:3001/post/detail?postIdx="+id.idx);
    //     console
    //     // setDetail({postInfo:info.data[0][0], postImg:info.data[1], postReply:info.data[2]})
    //     // const curr = info.data[0][0].email.split('@');
    //     // setEmail(curr[0])
    //     // if(detailImg===0){setDetailImg(1)}else{setDetailImg(0)} // scrollImg-useEffect 재실행을 위해 detailImg 값 변경
    // }, [isUpdate]);

    // useEffect(async () => { // scrollImg-useEffect
    //     if(detail.postImg.length!==0){setScrollImg(detail.postImg[0].imgName)}
    // }, [detailImg]);


    useEffect(() => {
        async function imgshow() {
            await axios.get("http://localhost:3001/post/detail?postId="+id.idx) //info
            .then((res) => {    
                if(res.data){
                    console.log(res.data);
                    setScrollImg(res.data[1][0].imgName);
                    setContent(res.data[0][0].content);
                    // setDetail()
                    // setScrollImg(res.data[1][0].imgName, res.data[0][0].content);  //이미지, content
                }
            });
        };
        imgshow();
    },[]);

    const date = (e) =>{
        const today = new Date();
        const timeValue = new Date(e);
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) { return `${betweenTime}분전`; }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) { return `${betweenTimeHour}시간전`; }
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) { return `${betweenTimeDay}일전`; }
        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    // 이미지 버튼
    const next = () => {
        img = detail.postImg.length-1 === img ? img : img+1;
        setScrollImg(detail.postImg[img].imgName)
    }
    const prev = () => {
        img = img === 0 ? 0 : img-1;
        setScrollImg(detail.postImg[img].imgName)
    }

    

    //게시물 삭제 팝업열기
    const[PostDelOn, setPostDelOn] = React.useState(false);
    const openPostDel = () =>{
        setPostDelOn(!PostDelOn);
        if(PostDelOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    // 게시물 삭제하기 실행
    const delSubmit = async () => {
        await axios.get('http://localhost:3001/post/delete?idx='+id.idx)
        .then(function (response) {
            alert('삭제되었습니다.');
            window.location.href = '/main?idx=' + cookie;
        })
        .catch(function (error) {
            alert('재시도해주세요');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 게시물 수정 팝업열기
    const[postEditOn, setPostEditOn] = React.useState(false);
    const openEditOn = () =>{
        setPostEditOn(!postEditOn);
        if(postEditOn){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    // 게시물 수정 실행
    const editSubmit = async () => {
        const content = editContent.current.value;  //현재 수정한 content가 넘어간다.
        let formData = new FormData();
        if(imgFile!==null){   // 수정할 사진을 등록했을 경우
            console.log("이미지파일널값");
            for (const key of Object.keys(imgFile)) {
                formData.append('fileupload', imgFile[key]);
            }
        } //end if
            console.log("수정할이미지파일없다");
            formData.append('id', id.idx);
            formData.append('content', content);
            console.log(formData.id);
            console.log(formData.content);
            return await axios.post(`http://localhost:3001/post/edit`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((res)=>{
                alert('게시물이 수정되었습니다.');
                setPostEditOn(!postEditOn);
                document.body.style.overflowY = "unset";
                if(isUpdate===0){setIsUpdate(1)}else{setIsUpdate(0)}
            });
    }

    

    // 댓글 등록 실행
    const submitReply = async () =>{
        const content = replyValue.current.value;
        await axios({
            method: "post",
            url:`http://localhost:3001/reply/insert_reply`,
            data: {
                idx: reReIdx,
                groupIdx: reReGroupIdx,
                postIdx: id.idx,
                content: content,
                memberIdx: cookie,
                parentIdx: reReIdx
            }
        }).then(function (response) {
            console.log(response)
            alert('등록되었습니다.');
            window.location.reload();
        })
        .catch(function (error) {
            alert('등록실패했습니다.');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 댓글 삭제 실행
    const delReply = (replyIdx)=>{
        axios.get('http://localhost:3001/reply/delete_reply?idx='+replyIdx)
        .then(function (response) {
            alert('삭제되었습니다.');
            if(isUpdate===0){setIsUpdate(1)}else{setIsUpdate(0)}
        })
        .catch(function (error) {
            alert('재시도해주세요');
            console.log(error);
        })
        .then(function () {
        });
    }

    // 게시물 수정 팝업 DOM
    const EditPop = ()=>{
        return (
            <EditPopWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title">게시글 수정</div>
                    </div>
                    <div className="popContent">
                        <div className="post1_pop_sec2">
                            <div className="prev_upload_box">
                                <div className="prev_upload">
                                    {detail.postImg!==null?
                                        detail.postImg.map(rowData=>(
                                            <span>
                                            <div className="prev_img">
                                                <img src={'/uploads/'+scrollImg} alt="게시물사진"/>
                                                <br/><div className="img_del"><i className="fas fa-times-circle"></i></div>
                                            </div>
                                        </span>
                                        )):<></>
                                    }
                                </div>
                            </div>
                            <div className="filebox">
                                <div className="file_aa">
                                    <div className="file_label">
                                        <label id="upload" htmlFor="files">
                                            <p>여기를 눌러 수정 사진을 넣으세요.</p>
                                        </label>
                                    </div>
                                </div>
                                <input type="file" id="files" multiple accept="image/png" onChange={handleFileSelect}/>
                            </div>
                        </div>
                        <div className="textWrap">
                            <textarea name="content" id="content" ref={editContent}>{detail.postInfo.content}</textarea>
                        </div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={editSubmit}>수정완료</button>
                        <button onClick={openEditOn}>취소</button>
                    </div>
                </div>
            </EditPopWrap>
        )
    }

     // 게시물 삭제 팝업 DOM
    const DelPop = ()=>{
        return (
            <DelPopWrap>
                <div className="popContainer">
                    <div className="popContent">
                        <div className="textWrap">게시물을 삭제하시겠습니까?</div>
                    </div>
                    <div className="btnWrap">
                        <button type="submit" onClick={delSubmit}>네, 삭제할래요</button>
                        <button onClick={openPostDel}>아니요</button>
                    </div>
                </div>
            </DelPopWrap>
        )
    }

    // 전체 DOM
    return (
        <>
            <Header/>
            <UploadForm>
                {postEditOn ? <EditPop/> : ""}
                {PostDelOn ? <DelPop/> : ""}
                <div className="upload_container">
                    <div className="left_right_container">
                        <div className="upload_left_box">
                            <div className="post_images_box">
                                <div className="images_list">
                                    <img className="up_img" src={'/uploads/'+scrollImg} alt="게시물 사진_디테일"/>
                                </div>
                                <div className="img_pagnation">
                                    <div className="prev_box">
                                        <img className="prev_arr" style={img===0?{opacity: '0'}:{opacity: '1'}} onClick={prev} src="/img/arr-left-circle.svg" alt="이전"/>
                                    </div>
                                    <div className="next_box">
                                        <img className="prev_arr" style={img===detail.postImg.length-1?{opacity: '0'}:{opacity: '1'}} onClick={next} src="/img/arr-right-circle.svg" alt="다음"/>
                                    </div>
                                </div>  
                            </div>
                            <div className="wr_post_container">
                                <div className="wr_post_area"><span className="wr_post_writer">{email}</span>{content}</div>
                            </div>
                        </div>
                        <div className="upload_right_box">
                            <div className="up_replay_box">
                                <div className="upload_header_box">
                                    <div className="upload_profile_box">
                                        <div className="up_pro_time_container">
                                            {/* <img className="upload_profile_img" src={detail.postInfo.img !== null? '/'+detail.postInfo.img : '/img/none/noneImg.png'}/> */}
                                            <div>
                                                <div className="upload_profile_id">
                                                    <span>{email}</span>
                                                </div>
                                                <div className="upload_time">
                                                    <span>{date(detail.postInfo.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="header_btn">
                                            <button type="button" className="main_btn" onClick={openEditOn}>수정</button>
                                            {/* <button type="button" className={''+detail.postInfo.idx+''===cookie?"upd_btn":'nomatch'} onClick={openEditOn}>수정</button> */}
                                            {/* <button type="button" className={''+detail.postInfo.idx+''===cookie?"del_btn":'nomatch'} onClick={openPostDel}>삭제</button> */}
                                            <button type="button" className="main_btn" onClick={openPostDel}>삭제</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="up_reply_minibox">
                                {detail.postReply.length!==0?
                                    detail.postReply.map((ReplyData, index) => (
                                        <div className={ReplyData.depth===0?"reply1_box":ReplyData.depth===1?"reply2_box":"reply3_box"}>
                                            <div className="re_profile">
                                                {/* <img className="re_profile_img" src={ReplyData.img !== null? '/'+ReplyData.img : '/img/none/noneImg.png'} alt="댓글 프로필"/> */}
                                            </div>
                                            <div className="re_reply_box">
                                                <div className="re_id_box">
                                                    <div className="re_id_div">
                                                        <span className="re_id_span">{ReplyData.name}</span>
                                                    </div>
                                                    <div className="re_reply">{ReplyData.content}</div>
                                                </div>
                                                <div className="re_time_reply_box">
                                                    <div className="re_time">{date(ReplyData.createdAt)}</div>
                                                    <button type="button" className="reply_btn" onClick={()=>{setReReIdx(ReplyData.idx); setReReGroupIdx(ReplyData.groupIdx); setReReName(ReplyData.email.split('@')[0]);}}>댓글달기</button>
                                                    <button style={ReplyData.memberIdx===Number(cookie)?{display:'block'}:{display:'none'}} className="re_delete_btn" type="button" onClick={()=>{delReply(ReplyData.idx)}}>삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                    )):
                                    <p style={{fontSize: '1.3rem', textAlign: 'center'}}>등록된 댓글이 없습니다.</p>
                                }
                                </div>
                                <div className="input_reply_container">
                                    {reReIdx!==null?
                                    <div className="reply_to_wrap">
                                        <div className="reply_to_box" style={{display:'inline-block', backgroundColor:'#14c1c7', borderRadius:'3rem',color:'#fff', fontSize:'1.2rem', fontWeight:'bolder', padding:'.3rem .8rem .4rem'}}>
                                            <span className="reply_to_val">{reReName}</span>
                                            <span className="reply_to_del" style={{marginLeft:'.5rem', cursor:'pointer'}} onClick={()=>{setReReIdx(null); setReReGroupIdx(null); setReReName(null)}}>X</span>
                                        </div>
                                    </div>
                                    :
                                    ''
                                    }
                                    <div className="input_reply_box">
                                        <div className="in_input_box">
                                            <textarea className="in_input" placeholder="댓글 달기.." ref={replyValue}></textarea>
                                        </div>
                                        <div className="re_btn_box">
                                            <button type="submit" className="re_btn" onClick={submitReply}>입력</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UploadForm>
        </>
    );

    //이미지 업로드 js 
    function handleFileSelect(evt) {
        setImgFile(evt.target.files);
        let fileSize = document.querySelectorAll(".prev_img");
        var files = evt.target.files;
        if(fileSize.length + files.length < 7){
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
                            '" alt="게시물 사진"/><br><div class="img_del"><i class="fas fa-times-circle"></i></div></div>'
                        ].join('');
                    document.querySelector('.prev_upload').insertBefore(span,null);
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
        }}else{ alert("사진은 6개까지 첨부 가능합니다");}
    }
    // document.getElementById('files').addEventListener('change', handleFileSelect, false);
}

export default UploadPage;