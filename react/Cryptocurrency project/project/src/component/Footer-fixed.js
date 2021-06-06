import React from 'react'


function Footer() {
    return (
        <div>
            {/* <!-- Footer --> */}
            <footer className="bg-success text-center text-white footer-fixed">
                {/* <!-- Grid container --> */}
                <div className="container p-4 pb-0">
                    {/* <!-- Section: Social media --> */}
                    <section className="mb-4">
                        {/* <!-- Facebook --> */}
                        <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/jatumongkon.suksrinuan" role="button">
                            <i className="bi bi-facebook"></i>
                        </a>

                        {/* <!-- Twitter --> */}
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                            <i className="bi bi-twitter"></i>
                        </a>

                        {/* <!-- Google --> */}
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                            <i className="bi bi-google"></i>
                        </a>

                        {/* <!-- Instagram --> */}
                        <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/peddiepie" role="button">
                            <i className="bi bi-instagram"></i>
                        </a>

                        {/* <!-- Linkedin --> */}
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                            <i className="bi bi-linkedin"></i>
                        </a>

                        {/* <!-- Github --> */}
                        <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                            <i className="bi bi-github"></i>
                        </a>
                    </section>
                    {/* <!-- Section: Social media --> */}
                </div>
                {/* <!-- Grid container --> */}

                {/* <!-- Copyright --> */}
                <div className="companyName text-center p-3">
                    © 2021: UNCLEPON ONLINE CO., LTD
                </div>
                {/* <!-- Copyright --> */}
            </footer>
        </div>
    )
}

export default Footer;