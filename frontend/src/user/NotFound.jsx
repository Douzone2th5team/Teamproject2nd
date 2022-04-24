import React from 'react';
import {FormnotFound404} from "./pageStyleBasic";
import {Cookies} from "react-cookie";

const cookies = new Cookies();
const cookie = cookies.get('three');
console.log(cookie)

function NotFound() {
    const returnMain = async () => {
        console.log(cookie)
        const urlMain = "http://localhost:3000/main?idx=" + cookie
        console.log(urlMain)
        window.location.href = urlMain;
    }

    return (
        <>
        <FormnotFound404>
            <div className="bg-purple">
            <div className="stars">
                <div className="central-body">
                    <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px"/>
                    <a className="btn-go-home" target="_blank" onClick={returnMain}>GO BACK HOME</a>
                </div>
                <div className="objects">
                    <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                    <div className="earth-moon">
                        <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg"
                             width="100px"/>
                        <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg"
                             width="80px"/>
                    </div>
                    <div className="box_astronaut">
                        <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg"
                             width="140px"/>
                    </div>
                </div>
                <div className="glowing_stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>

                </div>
            </div>
            </div>
        </FormnotFound404>
        </>
    );

}

export default NotFound;