import React, { Component } from 'react'
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'
import Footer from './Footer-fixed';

function Payment() {
    const mystyle = {
        position: "absolute",
        cursor: "inherit"
      };

    return (
        <div>
        <div className = "container dashboard_view">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link a-color" aria-current="page" href="/account/detail">DETAIL ACCOUNT</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/account/payment">BANK ACCOUNT</a>
                </li>
            </ul>
            <div className = "background-cc">
                <div className = "pt-4 p-3">
                    <h1>BANK ACCOUNTS</h1>
                    <h4>Select account below to make changes</h4>
                </div>
                <div>
                    <a class="btn btn-outline-success btn-add-paymnet" href="/account/payment/add" role="button">ADD BANK ACCOUNTS</a>
                </div>
                <table className = "table table-striped table-background table-center mt-3">
                    <thead>
                        <tr>
                        <th scope="col">SELECT</th>
                        <th scope="col">BANK</th>
                        <th scope="col">ACCOUNT</th>
                        <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="form-check">
                                    <input style={mystyle} className="form-check-input" type="radio" value="Male" name="gender" />
                                </div>
                            </td>
                            <td>SCB</td>
                            <td>
                                <p>นายเพชร จ้า 123456789</p>
                            </td>
                            <td>PRIMARY</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check">
                                    <input style={mystyle} className="form-check-input" type="radio" value="Male" name="gender" />
                                </div>
                            </td>
                            <td>CPE</td>
                            <td>นายเพชร จ้า 987654321</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <a class="btn btn-success btn-margin-payment" href="#" role="button">MAKE PRIMARY</a>
                    <a class="btn btn-danger btn-margin-payment" href="#" role="button">REMOVE</a>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Payment;