import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';

export default function LoggedinButton() {

    let userData = JSON.parse(localStorage.getItem("userdata"));
    const history = useHistory;

    const [logOut, setLogOut] = useState("");

    function userlogOut (){
        
        Axios.get("http://localhost:3001/user_logout").then((response)=>{
            localStorage.clear();
            history.push("/login");
            setLogOut(response.data.logOut);
        });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <li className="nav-item my-2">
                    <a href="/funds" className="nav-link active" aria-current="page">MY WALLET</a>
                </li>
                <li className="nav-item me-2 my-2">
                    <a href="/dashboard" className="nav-link active" aria-current="page">MY DASHBOARD</a>
                    {/* {userData!= null && <h5>{userData.email}</h5>} */}
                </li>
                <li className="nav-item me-2 my-2">
                    <a href="/account" className="nav-link active" aria-current="page">SETTINGS</a>
                </li>
                <li className="nav-item media my-2">
                    <a href="" className="btn btn-outline-danger" onClick={userlogOut}>LOGOUT</a>
                </li>
            </nav>
        </div>
    )
}