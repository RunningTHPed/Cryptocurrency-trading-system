import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-nofixed';
import Moment from 'react-moment';
import 'moment-timezone';

function Detail() {
    let userData = JSON.parse(localStorage.getItem("userdata"));

    const mystyle = {
        position: "absolute",
        cursor: "inherit"
    };

    return (
        <div>
            <div className="container dashboard_view mt-5 mb-5">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/account/detail">DETAIL ACCOUNT</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link a-color" href="/account/payment">BANK ACCOUNT</a>
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
                                <td>{userData.fnameTH} {userData.lnameTH}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{userData.fnameEN} {userData.lnameEN}</td>
                            </tr>
                            <tr>
                                <td>ข้อมูลติดต่อ</td>
                                <td>{userData.email}</td>
                            </tr>
                            <tr>
                                <td>วันเกิด</td>
                                <td><Moment format="MMMM DD YYYY">{userData.Birthdate}</Moment></td>
                            </tr>
                            <tr>
                                <td>เพศ</td>
                                <td>{userData.Gender}</td>
                            </tr>
                            <tr>
                                <td>สถานะ</td>
                                <td>{userData.Status}</td>
                            </tr>
                            <tr>
                                <td>เบอร์ติดต่อ</td>
                                <td>{userData.Phone}</td>
                            </tr>
                            <tr>
                                <td>ที่อยู่</td>
                                <td>{userData.Address}</td>
                            </tr>
                            <tr>
                                <td>รหัสไปรษณีย์</td>
                                <td>{userData.PostCode}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <a className="btn btn-success btn-margin-detail" href="/account/detail/edit" role="button">EDIT ACCOUNT</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Detail;