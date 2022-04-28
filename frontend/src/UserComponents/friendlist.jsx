import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie"

const cookies = new Cookies();
const cookie = cookies.get('three');


const FriendList = (idx) => {
    const [profile, setProfile] = useState({info:[0], postCnt:0, friendCnt:0, friend:[0]});
    const [btn, setBtn] = useState(true);
    let [friends, setFriends] = useState([]);
    let friendFor = [];
    let [friendPage, setFPage] = useState(0);

    useEffect(() => {
        async function test() {
          const profile = await axios.get("http://localhost:3001/main?id=" + idx.idx)
          console.log(profile.data[3].friendInform.length);
          setProfile({info:profile.data[0].member[0], postCnt:profile.data[1].postCnt,  friendCnt:profile.data[2].friendCnt, friend:profile.data[3]})
          if(profile.data[3].friendInform.length>8){ 
            setBtn(false);
            for(let i=0; i<profile.data[3].friendInform.length; i++){friendFor[i]=profile.data[3].friendInform[i]}
            setFriends(friendFor);
        }else{ 
            for(let i=0; i<profile.data[3].friendInform.length; i++){friendFor[i]=profile.data[3].friendInform[i]};
            setBtn(true);
            setFriends(friendFor); 
        }
        }
        test();
      }, []);

      // 상단 친구목록 버튼
    // TODO : 얘도 개판임
    const prev = () =>{
        for(let i=0; i<8; i++){friendFor[i]=profile.friend[i];}
        setFriends(friendFor);
        setFPage(0);
    }
    const next = () =>{
        let j = 0;
        for(let i=8; i<profile.friend.length; i++){friendFor[j]=profile.friend[i];j++}
        setFriends(friendFor);
        setFPage(1);
    }

return (
    <div>
                <div className={cookie===idx.idx?"section2_container":"nomatch"}>
                    <div className="section2_box">
                        {profile.friendCnt!=0?
                            friends.map(friendData=>(
                                <div className="user"onClick={()=>{window.location.href=`/main?idx=${friendData.id}`}}>
                                        <img className="user-img" src={friendData.img!==null?"/"+friendData.img:'/img/none/noneImg.png'}/>
                                        <div className="phone_name">{friendData.name}</div>
                                </div>
                            )):<></>
                        }
                    </div>
                </div>
                <div className={cookie===idx.idx?"arr_box":"nomatch"}>
                    <button type="button" className="arr_btn" style={btn===true||friendPage===0?{opacity: '0'}:{opacity: '1'}} id="prev" disabled={btn} onClick={prev}>test</button>
                    <button type="button" className="arr_btn" style={btn===true||friendPage===1?{opacity: '0'}:{opacity: '1'}} id="next" disabled={btn} onClick={next}>test2</button>
                </div>
            </div>
)

}

export default FriendList;