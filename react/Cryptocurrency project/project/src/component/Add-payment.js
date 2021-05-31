import React, { Component } from 'react'
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'
import Footer from './Footer-fixed';

function AddPayment() {
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
                    <h4>Add a bank account</h4>
                </div>
                <form>
                    <div className = "text-margin">BANK ACCOUNT</div>
                    <div className = "select-margin">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>SELECT A BANK</option>
                            <option value="1">Siam Commercial Bank</option>
                            <option value="2">Kasikorn Bank</option>
                            <option value="3">Krung Thai Bank</option>
                        </select>
                    </div>
                    <div className = "row">
                        <div className = "col input-margin">
                            <input type="text" className="form-control" id="BranchName" placeholder="BRANCH NAME"></input>
                        </div>
                        <div className = "col input-margin1">
                            <input type="text" className="form-control" id="BranchName" placeholder="Account Name"></input>
                        </div>
                        <div className = "col input-margin1">
                            <input type="text" className="form-control" id="BranchName" placeholder="Account Number"></input>
                        </div>
                    </div>
                </form>
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

export default AddPayment;