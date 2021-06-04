import React, { useState } from 'react'
import Footer from './Footer-fixed'
import Header from './Header'
//import * as Icon from 'react-bootstrap-icons';

function Home() {

    return (
        <div>
            <Header name="UnclePon" />
            <div className='main center'>
                <div className="box center">
                    <img src="Peddiepie.jpg" ></img>
                    <div>
                        <p className="user_name">ติดเมีย</p>
                        <p className="skill">Profile</p>
                    </div>
                    <div className="arr_container center">
                        <i className="fas fa-arrow-right"></i>

                    </div>
                    <div className="left_container off">
                        <p>ติดเมีย</p>
                        <div className="cancle center">
                            <i className="fas fa-times"></i>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;

/*
    const clc = document.querySelector(".cancle");
    const arr = document.querySelector(".arr_container");
    const left_container = document.querySelector(".left_container");

{arr.addEventListener("click", ()=>{
            arr.classList.add("active_arr");
            if(left_container.classList.contains("off")){
                left_container.classList.remove("off");
                left_container.classList.add("active");
            }
        })};

{clc.addEventListener("click", ()=>{
            arr.classList.remove("active_arr");
            if(left_container.classList.contains("active")){
                left_container.classList.remove("active");
                left_container.classList.add("off");
            }
        })};
*/