import styled from "styled-components";

const PostPopStyle = styled.div`
//게시물 업로드 팝업1(업로드할 이미지) css //
  
  .post1_pop_container {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .post1_pop_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: none;
    width: 50rem;
    height: 45rem;
    border-radius: 15px;
    padding: 1rem;
  }
  
  .pop3_close_btn {
    background: none;
    border: none;
  }
  
  .ch_upload_img {
    font-size: 2.3rem;
    margin: 0 0 0 20rem;
    font-weight: 600;
  }
  
  .post1_pop_sec2_box {
    margin-top: 3rem;
  }
  
  #files {
    display: none;
  }
  
  .prev_img {
    background-color: #efefef;
    width: 14rem;
    height: 13rem;
    margin: 1rem;
  }
  
  .prev_upload {
    display: flex;
    flex-wrap: wrap;
    height: 29rem;
  }
  
  #upload {
    margin-left: 1.3rem;
    cursor: pointer;
  }
  
  .file_aa {
    display: flex;
    margin-left: 1rem;
  }
  
  .upload_txt_box {
    margin: 0.8rem 1rem;
  }
  
  .upload_img_ch {
    border: none;
    background-color: #191970;
    box-shadow: 2px 2px 2px 2px gray;
    color: white;
    width: 9rem;
    height: 3.5rem;
    cursor: pointer;
    border-radius: 5px;
    cursor: pointer;
  }
  
  
  .post1_pop_sec3_box {
    display: flex;
    justify-content: center;
  }
  
  .img_del {
    background: none;
    border: none;
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    font-size: 2rem;
  }
  
  .prev_upload span {
    position: relative;
  }
  
  .fa-times-circle {
    color: #14c1c7;
  }
  
  .upload_txt {
    font-size: 1.3rem;
  }
  
  .file_label img {
    width: 3rem;
  }
  
  // 게시물 업로드 팝업2(선택한 이미지로 게시글 작성 팝업) css //
  
  .pop4_close_btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .post2_pop_container {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .post1_pop_sec1, .post2_pop_sec1 {
    position: relative;
  }
  
  .post1_pop_sec1 .wr_upload_txt, .post2_pop_sec1 .wr_upload_txt {
    margin-top: 1rem;
  }
  
  .pop4_close {
    position: absolute;
    top: 0;
    right: 0;
  }
  
  .post2_pop_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: none;
    width: 50rem;
    height: 45rem;
    border-radius: 15px;
    padding: 1rem;
  }
  
  .wr_upload_txt {
    text-align: center;
    font-size: 2.3rem;
    margin: 1rem 0;
    font-weight: 600;
  }
  
  .txt_table {
    border: 1px;
  }
  
  .post_input_txt {
    width: 45rem;
    height: 29rem;
    border: 3px solid #a5a7c38a;
    margin-top: -0.5rem;
    resize: none;
    font-size: 2rem;
  }
  
  .post_input_txt_box {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
  
  .post_txt_btn {
    border-radius: 5px;
    background-color: #14c1c7;
    color: white;
    border: none;
    height: 3.5rem;
    width: 10rem;
    cursor: pointer;
  }
  
  .post_txt_btn_box {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
  
  .post_mark {
    width: 15rem;
  }
  
  .post_input_txt_img {
    width: 15rem;
    margin-left: 2rem;
  }
  `

export default PostPopStyle;