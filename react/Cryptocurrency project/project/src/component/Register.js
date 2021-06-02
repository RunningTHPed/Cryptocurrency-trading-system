import Axios from 'axios'
import { useState } from 'react'
import Footer from './Footer-nofixed'
import Header from './Header'

function Register() {

  const [userList, setUserList] = useState([]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [id_card, setIdcard] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    Axios.post('http://localhost:3001/add_user',{
      fname: fname,
      lname: lname,
      email: email,
      phone_number: phone_number,
      id_card: id_card,
      password: password
    }).then(() => {
      setUserList([
        ...userList,
        {
          fname: fname,
          lname: lname,
          email: email,
          phone_number: phone_number,
          id_card: id_card,
          password: password
        }
      ])
    })
  }

  return (
    <div className="App container">
      <Header name="Sign up" />
      <h1>Register</h1>
      <form>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName">First name</label>
          <input 
            type="text" 
            className="form-control" 
            id="firstName" 
            required 
            onChange={(event) => {
              setFname(event.target.value)
            }}
          />
          <div className="invalid-feedback">
            Valid first name is required.
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="lastName">Last name</label>
          <input 
            type="text" 
            className="form-control" 
            id="lastName" 
            required 
            onChange={(event) => {
              setLname(event.target.value)
            }}
          />
          <div className="invalid-feedback">
            Valid last name is required.
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="email" 
          placeholder="" 
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <div className="invalid-feedback">
          Please enter a valid email address htmlFor shipping updates.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          placeholder="" 
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <div className="invalid-feedback">
          Please enter a valid password address htmlFor shipping updates.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="id_card">ID Card</label>
        <input 
          type="text" 
          className="form-control" 
          id="id_card" 
          placeholder="" 
          required 
          onChange={(event) => {
            setIdcard(event.target.value)
          }}
        />
        <div className="invalid-feedback">
          Please enter your ID Card.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="phonenumber">Phone number</label>
        <input 
          type="text" 
          className="form-control" 
          id="phonenumber" 
          placeholder="" 
          required 
          onChange={(event) => {
            setPhone(event.target.value)
          }}
        />
        <div className="invalid-feedback">
          Please enter your Phone number.
        </div>
      </div>
      <button className="btn btn-success btn-lg btn-block mb-3" onClick={addUser} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
