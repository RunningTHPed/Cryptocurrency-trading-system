import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function Deposit() {
    const mystyle = {
        position: "absolute",
        cursor: "inherit"
    };

    return (
        <div>
            <div className="container dashboard_view">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link a-color" aria-current="page" href="/deposit">DEPOSIT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/withdraw">WITHDRAW</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">

                    </div>
                    <form>
                        <div className="text-margin">WITHDRAW</div>

                        <div className="row ">
                            <div className="col input-margin">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Available balance</td>
                                            <td>2,000.00 THB</td>
                                        </tr>
                                        <tr>
                                            <td>Total balance</td>
                                            <td>2,000.00 THB</td>

                                        </tr>
                                        <tr>
                                            <td>In order</td>
                                            <td>0 THB</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="col input-margin2 background-cc-margin">
                                <input type="text" className="form-control" id="BranchName" placeholder="Withdraw amount"></input>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Fee</td>
                                            <td>2,000.00 THB</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a class="btn btn-danger btn-margin-withdraw" href="#" role="button">WITHDRAW</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Deposit;