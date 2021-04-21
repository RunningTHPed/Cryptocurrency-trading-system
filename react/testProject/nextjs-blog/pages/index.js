import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer-fixed'


function IndexPage ()  {
  return(
    <div>

      <Header name="Login" />
      <Navbar />

        {/* <!-- Form Login --> */}
        <div className="vertical-center">
            <div className="text-center">
                <div className="container form-center-signin">
                    <form className="form-signin">
                        <img className="mb-4 rounded" src="Peddiepie.jpg" alt="" width="72" height="72"></img>
                        <h1 className="h3 mb-3 font-weight-normal">LOG IN</h1>
                        {/* <label htmlFor="inputEmail" className="sr-only">Email address</label> */}
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus></input>
                        {/* <label htmlFor="inputPassword" className="sr-only">Password</label> */}
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                        <div className="checkbox mb-3">
                          <label>
                            <input type="checkbox" value="remember-me"></input>Remember me
                          </label>
                        </div>
                        <button className="btn btn-lg btn-success btn-block form-control" type="submit">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
        
        <Footer />

    </div>
  )
}

export default IndexPage;
