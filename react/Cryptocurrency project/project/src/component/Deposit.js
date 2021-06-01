import React, { Component } from 'react'
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'
import Footer from './Footer-fixed';

function Deposit() {
    const mystyle = {
        position: "absolute",
        cursor: "inherit"
      };

    return (
        <div>
        <div className = "container dashboard_view">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/deposit">DEPOSIT</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link a-color" href="/withdraw">WITHDRAW</a>
                </li>
            </ul>
            <div className = "background-cc">
                <div className = "pt-4 p-3">
                    
                </div>
                <form>
                    <div className = "text-margin">DEPOSIT</div>
                    
                    <div className = "row ">
                        <div className = "col input-margin">
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
                        <div className = "col input-margin2 background-cc-margin">
                            <input type="text" className="form-control" id="BranchName" placeholder="Deposit amount"></input>
                            <a class="btn btn-success btn-margin-deposit" href="#" role="button">DEPOSIT NOW</a>
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