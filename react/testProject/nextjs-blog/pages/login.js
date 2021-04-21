import React from 'react'
import Header from './Header'
import Navbar from './Navbar'

export default function LoginPage () {
    return(
        <div>
            <Header />
            <Navbar />
            <form class="vertical-center">
                <div class="text-center">
                    <div class="container form-center-signin">
                        <form class="form-signin">
                            <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                            <h1 class="h3 mb-3 font-weight-normal">LOG IN</h1>
                            <label for="inputEmail" class="sr-only">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus></input>
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required></input>
                            <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"></input>
                                Remember me
                            </label>
                            </div>
                            <button class="btn btn-lg btn-success btn-block form-control" type="submit">LOGIN</button>
                        </form>
                    </div>
                </div>
            </form> 
        </div>
    )
}