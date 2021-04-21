import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer-nofixed'

function RegisterPage (){
    return (
      <div>
        <Header name="Register" />
        <Navbar />

        <div className="container">
          <div className="form-register">
              <h4 className="mb-4">SIGN UP</h4>
              <form className="needs-validation" novalidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">ชื่อ</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">นามสกุล</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                {/* <!-- <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input type="text" className="form-control" id="username" placeholder="Username" required />
                    <div className="invalid-feedback" style="width: 100%;">
                      Your username is required.
                    </div>
                  </div>
                </div> --> */}
    
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="" />
                  <div className="invalid-feedback">
                    Please enter a valid email address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="" />
                  <div className="invalid-feedback">
                    Please enter a valid password address htmlFor shipping updates.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Confirm Password</label>
                  <input type="password" className="form-control" id="password" placeholder="" />
                  <div className="invalid-feedback">
                    Please enter a valid Confirm Password address htmlFor shipping updates.
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                      <label htmlFor="birthdate">Birthdate</label>
                      <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-3 mb-3">
                      <label htmlFor="gender">Gender</label>
                      <br />
                      <div className="form-check form-check-inline my-2">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                          <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                      </div>
                      <div className="form-check form-check-inline my-2">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                          <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                      </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="status">Status</label>
                    <select className="custom-select d-block w-100 form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Widow</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="idcard">ID Card</label>
                  <input type="text" className="form-control" id="idcard" placeholder="" required />
                  <div className="invalid-feedback">
                    Please enter your ID Card.
                  </div>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="behindidcard">Behind ID Card</label>
                  <input type="text" className="form-control" id="behindidcard" placeholder="" required />
                  <div className="invalid-feedback">
                    Please enter your behind ID Card.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phonenumber">Phone number</label>
                  <input type="text" className="form-control" id="phonenumber" placeholder="" required />
                  <div className="invalid-feedback">
                    Please enter your Phone number.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="" required />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
    
                <div className="mb-3">
                  <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" id="address2" placeholder="" />
                </div>
    
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <select className="custom-select d-block w-100 form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>China</option>
                      <option>Thailand</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="province">Province</label>
                    <select className="custom-select d-block w-100 form-select" id="province" required>
                      <option value="">Choose...</option>
                      <option>California</option>
                      <option>Bangkok</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid province.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                {/* <!-- <hr className="mb-4"> --> */}
                <a href=""></a>
                <div className="custom-control custom-checkbox mb-3">
                  <input type="checkbox" className="custom-control-input" id="same-address" />
                  <label className="custom-control-label" htmlFor="same-address">I have read and agree to the <a href="">Terms of Use</a> and <a href="">Privacy Policy</a>.</label>
                </div>
                <hr className="mb-4"></hr>
                <button className="btn btn-success btn-lg btn-block mb-3" type="submit">Sign Up</button>
              </form>
          </div>
      </div>

      <Footer  fixed="no" />
    </div>
  )
}

export default RegisterPage;