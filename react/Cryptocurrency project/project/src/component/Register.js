import Axios from 'axios'
import { useState } from 'react'
import Footer from './Footer-nofixed'
import Header from './Header'

function Register() {

  const [userList, setUserList] = useState([]);
  const [fnameTH, setfnameTH] = useState("");
  const [lnameTH, setlnameTH] = useState("");
  const [fnameEN, setfnameEN] = useState("");
  const [lnameEN, setlnameEN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [Gender, setGender] = useState("");
  const [Status, setStatus] = useState("");
  const [id_card, setIDcard] = useState("");
  const [BehindID, setBehindID] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [PostCode, setPostCode] = useState("");
  
  const addUser = () => {
    Axios.post('http://localhost:3001/add_user',{
      fnameTH: fnameTH,
      lnameTH: lnameTH,
      fnameEN: fnameEN,
      lnameEN: lnameEN,
      email: email,
      password: password,
      Birthdate: Birthdate,
      Gender: Gender,
      Status: Status,
      id_card: id_card,
      BehindID: BehindID,
      Phone: Phone,
      Address: Address,
      PostCode: PostCode

    }).then(() => {
      setUserList([
        ...userList,
        {
          fnameTH: fnameTH,
          lnameTH: lnameTH,
          fnameEN: fnameEN,
          lnameEN: lnameEN,
          email: email,
          password: password,
          Birthdate: Birthdate,
          Gender: Gender,
          Status: Status,
          id_card: id_card,
          BehindID: BehindID,
          Phone: Phone,
          Address: Address,
          PostCode:PostCode
        }
      ])
    })
  }

  return (
    <div>
    <div className="App container">
      <Header name="Sign up" />
        <div className="form-register">
          <h4 className="mb-4">SIGN UP</h4>
          <form className="needs-validation" novalidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>ชื่อ</label>
                <input type="text" className="form-control" id="firstName" placeholder="" required
                  onChange={(event) => {
                    setfnameTH(event.target.value)
                  }}
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="lastName">นามสกุล</label>
                <input type="text" className="form-control" id="lastName" placeholder="" required
                  onChange={(event) => {
                    setlnameTH(event.target.value)
                  }}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName">First name</label>
                  <input type="text" class="form-control" id="firstName" placeholder="" required
                    onChange={(event) => {
                      setfnameEN(event.target.value)
                    }}
                  />
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName">Last name</label>
                  <input type="text" class="form-control" id="lastName" placeholder="" required
                    onChange={(event) => {
                      setlnameEN(event.target.value)
                    }}
                  />
                  <div class="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder=""
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class="mb-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder=""
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
                <div class="invalid-feedback">
                  Please enter a valid password address for shipping updates.
                </div>
              </div>

              <div class="row">
                <div class="col-md-5 mb-3">
                    <label for="birthdate">Birthdate</label>
                    <input type="date" class="form-control"
                      onChange={(event) => {
                        setBirthdate(event.target.value)
                      }}
                    />
                </div>
                <div class="col-md-3 mb-3">
                    <label for="gender">Gender</label>
                    <br />
                    <div class="form-check form-check-inline my-2">
                        <input class="form-check-input" type="radio" value="Male"
                          onChange={(event) => {
                            setGender(event.target.value)
                          }}
                        />
                        <label class="form-check-label" for="inlineRadio1">Male</label>
                    </div>
                    <div class="form-check form-check-inline my-2">
                        <input class="form-check-input" type="radio" value="Female"
                          onChange={(event) => {
                            setGender(event.target.value)
                          }}
                        />
                        <label class="form-check-label" for="inlineRadio2">Female</label>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="status">Status</label>
                  <select class="custom-select d-block w-100 form-select" id="country" required
                    onChange={(event) => {
                      setStatus(event.target.value)
                    }}
                  >
                    <option>Choose...</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widow">Widow</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label for="idcard">ID Card</label>
                <input type="text" class="form-control" id="idcard" placeholder="" required
                  onChange={(event) => {
                    setIDcard(event.target.value)
                  }}
                />
                <div class="invalid-feedback">
                  Please enter your ID Card.
                </div>
              </div>

              <div class="mb-3">
                <label for="behindidcard">Behind ID Card</label>
                <input type="text" class="form-control" id="behindidcard" placeholder="" required
                  onChange={(event) => {
                    setBehindID(event.target.value)
                  }}
                />
                <div class="invalid-feedback">
                  Please enter your behind ID Card.
                </div>
              </div>

              <div class="mb-3">
                <label for="phonenumber">Phone number</label>
                <input type="text" class="form-control" id="phonenumber" placeholder="" required
                  onChange={(event) => {
                    setPhone(event.target.value)
                  }}
                />
                <div class="invalid-feedback">
                  Please enter your Phone number.
                </div>
              </div>

              <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address" placeholder="" required
                  onChange={(event) => {
                    setAddress(event.target.value)
                  }}
                />
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div class="col-md-4 mb-3">
                  <label for="status">Postcode</label>
                  <select class="custom-select d-block w-100 form-select" id="country" required
                    onChange={(event) => {
                      setPostCode(event.target.value)
                    }}
                  >
                    <option>Choose...</option>
                    <option value="10000">10000 (Middle)</option>
                    <option value="20000">20000 (East)</option>
                    <option value="30000">30000 (South)</option>
                    <option value="40000">40000 (West)</option>
                    <option value="50000">50000 (North)</option>
                  </select>
                </div>

                <div className="Postcode-title">
                    <h6>*This postcode is dummy variable </h6>
                </div>

              <button className="btn btn-success btn-lg btn-block mb-3 " onClick={addUser} type="submit">Sign Up</button>
          </form>
      </div>
      
    </div>
      <Footer />
    </div>
    
  );
}

export default Register;
