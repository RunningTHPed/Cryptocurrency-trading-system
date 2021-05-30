import React, { useEffect , useState } from 'react'
import Axios from 'axios'
import NotLoggedinButton from './NotLoggedinButton';
import LoggedinButton from './LoggedinButton';

function Navbar() {

    const [userRole, setRole] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;
    useEffect(()=>{
        Axios.get("http://localhost:3001/user_login").then((response)=>{
            setLoginStatus(response.data.loggedIn);
            if(loginStatus){
                setRole(response.data.user[0].role);
            }
        });
    }, []);

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand my-2 text-success h1" href="/">UnclePon</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item my-2">
                                <a href="/chart" className="nav-link active" aria-current="page">MARKET</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown me-2 my-2">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    EN
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">EN</a></li>
                                    <li><a className="dropdown-item" href="#">TH</a></li>
                                    </ul>
                                </li>
                                <h2>{userRole}</h2>
                                {loginStatus == false && <NotLoggedinButton />}{loginStatus == true && <LoggedinButton />}
                                {/* <li className="nav-item me-2 my-2">
                                    <a href="/login" className="btn btn-outline-success">LOGIN</a>
                                </li>
                                <li className="nav-item media my-2">
                                    <a href="/register" className="btn btn-outline-success">OPEN ACCOUNT</a>
                                </li> */}
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;