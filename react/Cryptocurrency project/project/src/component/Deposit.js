import React, { Component } from 'react'
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'
import Footer from './Footer-fixed';

function Deposit() {
    const[DepositMoney, setDepositMoney] = useState("");
    const[DataPayment, setDataPayment] = useState([]);
    const [PaymentStatus, setPaymentStatus] = useState("");
    const [PaymentError, setPaymentError] = useState(false);

    let userData = JSON.parse(localStorage.getItem("userdata"));


    const getPayment = async () => {
        try {
            const res = await Axios.post('http://localhost:3001/Data_Payment_id', {
                IDCard: userData.id_card
            });               
            console.log(res.data);
            setDataPayment(res.data);
        }
        catch (error) {
            console.log(error.response);
        }
    }
    
    useEffect(() => {
        getPayment();
    }, []);

    const Deposit = () => {
        Axios.post('http://localhost:3001/deposit_money',{
            IDCard: userData.id_card,
            DepositMoney: DepositMoney
        }).then((response) => {
            if (response.data.message) {
                console.log('Hellooo');
                console.log(DataPayment);
                setPaymentStatus(response.data.message);
                setPaymentError(true);
            } else {
                console.log('Hellooo');
                console.log(DataPayment);
                window.location = "/dashboard"
            }
        })
    }

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
                            <input type="text" className="form-control" id="BranchName" placeholder="Deposit amount"
                                onChange={(event) => {
                                    setDepositMoney(event.target.value)
                                }}
                            ></input>
                            <a class="btn btn-success btn-margin-deposit" href="#" role="button" onClick={Deposit} >DEPOSIT NOW</a>
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