import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-nofixed';

function EditDetail() {
    const [Status, setStatus] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [WithdrawStatus, setWithdrawStatus] = useState("");

    let userData = JSON.parse(localStorage.getItem("userdata"));

    const EditDetail = () => {
        Axios.post('http://localhost:3001/edit_detail',{
            IDCard: userData.id_card,
            Status: Status,
            Phone : Phone,
            Address: Address
        }).then((response) => {
            localStorage.setItem('userdata', JSON.stringify(response.data[0]));
            window.location = "/account/detail"
        })
    }

    const mystyle = {
        position: "absolute",
        cursor: "inherit"
    };

    return (
        <div>
            <div className="container dashboard_view">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/account/detail">DETAIL ACCOUNT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link a-color" href="/account/payment">BANK ACCOUNT</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">
                        <h1>DETAILS ACCOUNT</h1>
                    </div>
                    <table className="table table-background mt-3">
                        <tbody>
                            <tr>
                                <td >ชื่อ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.fnameTH} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td >นามสกุล</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.lnameTH} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>FirstName</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.fnameEN} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>LastName</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.lnameEN} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>ข้อมูลติดต่อ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.email} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>วันเกิด</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.Birthdate} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>เพศ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.Gender} disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>สถานะ</td>
                                <td>
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
                                </td>
                            </tr>
                            <tr>
                                <td>เบอร์ติดต่อ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder={userData.Phone} required
                                        onChange={(event) => {
                                            setPhone(event.target.value)
                                            }}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>ที่อยู่</td>
                                <td>
                                    <input type="text" className="form-control" id=".." required placeholder={userData.Address} 
                                        onChange={(event) => {
                                            setAddress(event.target.value)
                                            }}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <a class="btn btn-danger btn-margin-payment" href="/account/detail" role="button">CANCEL</a>
                        <a class="btn btn-success btn-margin-payment" href="#" role="button" onClick={EditDetail}>SUBMIT</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditDetail;