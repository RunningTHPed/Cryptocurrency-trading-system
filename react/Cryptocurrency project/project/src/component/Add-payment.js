import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function AddPayment() {
    const [BranchName, setBranchName] = useState("");
    const [AccountName, setAccountName] = useState("");
    const [AccountNumber, setAccountNumber] = useState("");
    const [BankName, setBankName] = useState("");
    const [PaymentStatus, setPaymentStatus] = useState("");
    const [PaymentError, setPaymentError] = useState(false);

    let userData = JSON.parse(localStorage.getItem("userdata"));

    const Addpayment = () => {
        Axios.post('http://localhost:3001/add_payment', {
            BranchName: BranchName,
            AccountName: AccountName,
            AccountNumber: AccountNumber,
            BankName: BankName,
            IDCard: userData.id_card
        }).then((response) => {
            if (response.data.message) {
                setPaymentStatus(response.data.message);
                setPaymentError(true);
            } else {
                window.location = "/account/payment"
            }
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
                        <a class="nav-link a-color" aria-current="page" href="/account/detail">DETAIL ACCOUNT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/account/payment">BANK ACCOUNT</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">
                        <h1>BANK ACCOUNTS</h1>
                        <h4>Add a bank account</h4>
                    </div>
                    <form onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="text-margin">BANK ACCOUNT</div>
                        <div className="select-margin">
                            <select className="form-select" aria-label="Default select example"
                                onChange={(event) => {
                                    setBankName(event.target.value)
                                }}
                            >
                                <option selected>SELECT A BANK</option>
                                <option value="SCB">Siam Commercial Bank</option>
                                <option value="KBANK">Kasikorn Bank</option>
                                <option value="KTB">Krung Thai Bank</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col input-margin">
                                <input type="text" className="form-control" id="BranchName" placeholder="BRANCH NAME"
                                    onChange={(event) => {
                                        setBranchName(event.target.value)
                                    }}
                                >
                                </input>
                            </div>
                            <div className="col input-margin1">
                                <input type="text" className="form-control" id="BranchName" placeholder="Account Name"
                                    onChange={(event) => {
                                        setAccountName(event.target.value)
                                    }}
                                >
                                </input>
                            </div>
                            <div className="col input-margin1">
                                <input type="text" className="form-control" id="BranchName" placeholder="Account Number"
                                    onChange={(event) => {
                                        setAccountNumber(event.target.value)
                                    }}
                                >
                                </input>
                            </div>

                            {PaymentError &&
                                (
                                    <div class="alert alert-danger alert-size" role="alert" >
                                        {PaymentStatus}
                                    </div>
                                )
                            }

                        </div>

                    </form>
                    <div>
                        <a class="btn btn-danger btn-margin-payment" href="/account/payment" role="button">CANCEL</a>
                        <a class="btn btn-success btn-margin-payment" href="#" role="button" onClick={Addpayment}>SUBMIT</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddPayment;