import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import { Dropdown } from 'react-bootstrap';

export default function LoggedinButton() {

    let userData = JSON.parse(localStorage.getItem("userdata"));
    const history = useHistory;

    const [logOut, setLogOut] = useState("");

    function userlogOut() {

        Axios.get("http://localhost:3001/user_logout").then((response) => {
            localStorage.clear();
            //history.push("/login");
            setLogOut(response.data.logOut);
        });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
{/* 
                <ul className="navbar-nav me-auto mb-3 mb-lg-0">
                        <li className="nav-item my-3">
                            <a href="/analysis" className="nav-link active" aria-current="page">INSIGHT</a>
                        </li>
                </ul> */}

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                        </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/funds">MY WALLET</Dropdown.Item>
                        <Dropdown.Item href="/dashboard">MY DASHBOARD</Dropdown.Item>
                        <Dropdown.Item href="/account">SETTINGS</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/login" onClick={userlogOut}>LOGOUT</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                


                
                {/* <li className="nav-item my-2">
                    <a href="/funds" className="nav-link active" aria-current="page">MY WALLET</a>
                </li>
                <li className="nav-item me-2 my-2">
                    <a href="/dashboard" className="nav-link active" aria-current="page">MY DASHBOARD</a>
                </li>
                <li className="nav-item me-2 my-2">
                    <a href="/account" className="nav-link active" aria-current="page">SETTINGS</a>
                </li>
                <li className="nav-item media my-2">
                    <a href="" className="btn btn-outline-danger" onClick={userlogOut}>LOGOUT</a>
                </li> */}
            </nav>
        </div>
    )
}