import React, { Component } from 'react'
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'
import Footer from './Footer-nofixed';

function Detail() {
    const mystyle = {
        position: "absolute",
        cursor: "inherit"
      };

    return (
        <div>
            <div className = "container dashboard_view">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/account/detail">DETAIL ACCOUNT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link a-color" href="/account/payment">BANK ACCOUNT</a>
                    </li>
                </ul>
                <div className = "background-cc">
                    <div className = "pt-4 p-3">
                        <h1>DETAILS ACCOUNT</h1>
                    </div>
                    <table className = "table table-background mt-3">
                        <tbody>
                            <tr>
                                <td >ชื่อ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder="เพชร จ้า" disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder="Ped Ja" disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>ข้อมูลติดต่อ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder="pedja@mail.com" disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>วันเกิด</td>
                                <td>
                                <input type="text" className="form-control" id=".." placeholder="19 April 1975" disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>เพศ</td>
                                <td>
                                <input type="text" className="form-control" id=".." placeholder="ชาย" disabled></input>
                                </td>
                            </tr>
                            <tr>
                                <td>สถานะ</td>
                                <td>
                                <select className="form-select" aria-label="Default select example">
                                <option selected>SELECT A STATUS</option>
                                <option value="1">โสด</option>
                                <option value="2">ไม่โสด</option>
                                <option value="3">โสด</option>
                            </select>
                                </td>
                            </tr>
                            <tr>
                                <td>เบอร์ติดต่อ</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder="0933238170"></input>
                                </td>
                            </tr>
                            <tr>
                                <td>ที่อยู่</td>
                                <td>
                                    <input type="text" className="form-control" id=".." placeholder="123 ... 10140"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <a class="btn btn-danger btn-margin-payment" href="#" role="button">CANCEL</a>
                        <a class="btn btn-success btn-margin-payment" href="#" role="button">SUBMIT</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Detail;