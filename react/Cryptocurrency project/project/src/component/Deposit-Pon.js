import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function DepositPon() {
    const [value, setValue] = useState(0);

    let userData = JSON.parse(localStorage.getItem("userdata"));

    const Deposit = async () => {
        await Axios.post('http://localhost:3001/deposit_coin',{
            id_card: userData.id_card,
            value: value,
            shortname: "PON",
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
                window.location = "/funds";
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
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/deposit/pon">DEPOSIT</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link a-color" href="/withdraw/pon">WITHDRAW</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">

                    </div>
                    <form>
                        <div className="text-margin">DEPOSIT PON COIN</div>

                        <div className="row ">
                            <div className="col input-margin">
                                <div>
                                    <h5>Follow the 2 easy steps.</h5>
                                </div>
                                <div>
                                    1. Enter the amount
                            </div>
                                <div>
                                    Enter the deposit amount.
                            </div>
                                <div>
                                    2. Confirm transaction
                            </div>
                                <div>
                                    Click "Deposit now" to confirm transaction.
                            </div>

                            </div>
                            <div className="col input-margin2 background-cc-margin">
                                <input type="text" className="form-control" id="BranchName" placeholder="Deposit amount"
                                    onChange={(event) => {
                                        setValue(event.target.value);
                                    }}
                                ></input>
                                <a className="btn btn-success btn-margin-deposit" href="#" role="button" onClick={Deposit} >DEPOSIT NOW</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DepositPon;