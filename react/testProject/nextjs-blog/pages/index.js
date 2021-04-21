import Link from 'next/link'
import React from 'react'
import Head from 'next/head'


function IndexPage ()  {
  return(
    <div>

      <Head>
        <meta charset="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

        <link rel="stylesheet" href="styles.css"></link>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>

        <script src="https://kit.fontawesome.com/3736cc5c9e.js" crossorigin="anonymous"></script>

        <title>UnclePon</title>
      </Head>

          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand my-2 text-success h1" href="#">UnclePon</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item my-2">
                            <a className="nav-link active" aria-current="page" href="#">MARKET</a>
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
                            <li className="nav-item me-2 my-2">
                              <Link href="/login">
                              <a className="btn btn-outline-success">LOGIN</a>
                              </Link>
                            </li>
                            <li className="nav-item media my-2">
                              <Link href="/register">
                                <a className="btn btn-outline-success">OPEN ACCOUNT</a>
                              </Link>
                            </li>
                        </ul>
                        
                        
                    </form></div>
            </div>
        </nav>

        {/* <!-- Form Login --> */}
        <div className="vertical-center">
            <div className="text-center">
                <div className="container form-center-signin">
                    <form className="form-signin">
                        <img className="mb-4 rounded" src="Peddiepie.jpg" alt="" width="72" height="72"></img>
                        <h1 className="h3 mb-3 font-weight-normal">LOG IN</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus></input>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
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
        
        {/* <!-- Footer --> */}
      <footer className="bg-success text-center text-white footer-fixed">
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Social media --> */}
          <section className="mb-4">
            {/* <!-- Facebook --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/jatumongkon.suksrinuan" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
      
            {/* <!-- Twitter --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </a>
      
            {/* <!-- Google --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-google"></i>
            </a>
      
            {/* <!-- Instagram --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-instagram"></i>
            </a>
      
            {/* <!-- Linkedin --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>
      
            {/* <!-- Github --> */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}
      
        {/* <!-- Copyright --> */}
        <div className="companyName" class="text-center p-3">
          © 2021: UNCLEPON ONLINE CO., LTD
        </div>
        {/* <!-- Copyright --> */}
    </footer>

    </div>
  )
}

export default IndexPage;
