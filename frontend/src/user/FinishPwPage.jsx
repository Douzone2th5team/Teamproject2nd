import React from "react";
import { Link } from "react-router-dom";
import {Findidpw} from "./pageStyleBasic"

const FinFindidpw = () => {

    return (
        <Findidpw>
        <div className="body">
            <div className="topNum">
                {/* <img src="img/loginback.jpg"></img> */}
            </div>
            <div className="findtopnav">
                <p>๐ป</p>
                <h3>์์ ๋น๋ฐ๋ฒํธ๋ฅผ ์ ์กํ์์ต๋๋ค.<br></br>
                    ์ ์ก๋ฐ์ ์์ ๋น๋ฐ๋ฒํธ๋ก ๋ก๊ทธ์ธ ํด์ฃผ์ธ์.
                </h3>
            </div>
            <div className="finfind">
                <Link to="/"><button>๋ก๊ทธ์ธ</button></Link>
            </div>
        </div>
        </Findidpw>
    )
}
    
export default FinFindidpw;