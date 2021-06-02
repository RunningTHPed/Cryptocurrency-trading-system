import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-nofixed';

function Detail() {
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
                        <h4>...</h4>
                    </div>
                    <table className="table table-background mt-3">
                        <tbody>
                            <tr>
                                <td >ชื่อ</td>
                                <td>เพชร จ้า</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>Ped Ja</td>
                            </tr>
                            <tr>
                                <td>ข้อมูลติดต่อ</td>
                                <td>pedja@mail.com</td>
                            </tr>
                            <tr>
                                <td>วันเกิด</td>
                                <td>5 April 1975</td>
                            </tr>
                            <tr>
                                <td>เพศ</td>
                                <td>ชาย</td>
                            </tr>
                            <tr>
                                <td>สถานะ</td>
                                <td>โสด</td>
                            </tr>
                            <tr>
                                <td>เบอร์ติดต่อ</td>
                                <td>0933238170</td>
                            </tr>
                            <tr>
                                <td>ที่อยู่</td>
                                <td>123 บ้าน ... 10140</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <a class="btn btn-success btn-margin-detail" href="/account/detail/edit" role="button">EDIT ACCOUNT</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Detail;