import React from 'react'
import Header from './Header'
import Footer from './Footer-fixed'
import Axios from 'axios'
import { useState } from 'react'



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const userLogin = () => {
        Axios.post('http://localhost:3001/user_login', {
            email: email,
            password: password
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].email);
            }
        })
    }

    return (
        <div>
            <Header name='Log in' />
            {/* <Navbar /> */}

            {/* <!-- Form Login --> */}
            <div className="vertical-center">
                <div className="text-center">
                    <div className="container form-center-signin">
                        <form className="form-signin" onSubmit={(event) => {event.preventDefault();}}>
                            <img className="mb-4 rounded" src="logo1112.png" alt="" width="72" height="72"></img>
                            <h1 className="h3 mb-3 font-weight-normal">LOG IN</h1>
                            {/* <label htmlFor="inputEmail" className="sr-only">Email address</label> */}
                            <input
                                type="email"
                                id="inputEmail"
                                className="form-control"
                                placeholder="Email address"
                                required
                                autoFocus
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            ></input>
                            {/* <label htmlFor="inputPassword" className="sr-only">Password</label> */}
                            <input
                                type="password"
                                id="inputPassword"
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            ></input>
                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me"></input> Remember me
                            </label>
                            </div>
                            <button className="btn btn-lg btn-success btn-block form-control" onClick={userLogin} >LOGIN</button>
                        </form>
                    </div>
                    <h2>{loginStatus}</h2>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Login;
