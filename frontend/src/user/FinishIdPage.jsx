import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {FindId} from  "./pageStyleBasic"


const SuckFindId = () => {
    const email = useParams();
    return (
        <FindId>
            <div className="body">
                <div className="findtopnav">
                    <div className="topNum">
                        <h2>๐ป</h2>
                    </div>
                    <h1>ํ์๋์ ์ด๋ฉ์ผ ์ฃผ์๋ <br></br><span>{email.email}</span> ์๋๋ค.</h1>
                </div>
                <div className="twoBtn">
                    <Link to="/FindIdPw2">
                        <button className="twoKindBtn">
                            ๋น๋ฐ๋ฒํธ ์ฐพ๊ธฐ
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="twoKindBtn2">
                            ๋ก๊ทธ์ธ
                        </button>
                    </Link>
                </div>
            </div>
        </FindId>
    )
}
    
export default SuckFindId;