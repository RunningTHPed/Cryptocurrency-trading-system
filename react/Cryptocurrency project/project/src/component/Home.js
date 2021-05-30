import React,{useState} from 'react'
import Footer from './Footer-fixed'
import Header from './Header'
//import * as Icon from 'react-bootstrap-icons';

function Home () {

    return (
        <div>
            <Header name="UnclePon" />
            <div class='main center'>
                <div class="box center">
                    <img src="Peddiepie.jpg" ></img>
                    <div>
                        <p class="user_name">ติดเมีย</p>
                        <p class="skill">Profile</p>
                    </div>
                    <div class="arr_container center">
                        <i class="fas fa-arrow-right"></i>
                        
                    </div>
                    <div class="left_container off">
                        <p>ติดเมีย</p>
                        <div class="cancle center">
                            <i class="fas fa-times"></i>
                            
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