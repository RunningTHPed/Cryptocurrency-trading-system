import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function Deposit() {
    const [DepositMoney, setDepositMoney] = useState("");
    const [DepositStatus, setDepositStatus] = useState("");
    const [PaymentError, setPaymentError] = useState(false);

    const[availableMoney, setAvailableMoney] = useState(0);
    var money_diff = 0;
    var sumMoneyDeposit = 0;
    var sumMoneyOrder = 0;
    var sumMoneySellHistory = 0;
    var sumMoneyBuyHistory = 0;

    let userData = JSON.parse(localStorage.getItem("userdata"));


    const getPayment = async () => {
        try {
            await Axios.post('http://localhost:3001/summary_money', {
                IDCard: userData.id_card
            }).then((response) => {
                console.log(response.data[0].mySum);
                sumMoneyDeposit = response.data[0].mySum;
            });  

            await Axios.post('http://localhost:3001/summary_money_history_buy', {
                id_card: userData.id_card
            }).then((response) => {
                if(response.data[0].mySum !== null){
                    sumMoneyBuyHistory = response.data[0].mySum;
                } else {
                    sumMoneyBuyHistory = 0;
                }
            });  

            await Axios.post('http://localhost:3001/summary_money_history_sell', {
                id_card: userData.id_card
            }).then((response) => {
                if(response.data[0].mySum !== null){
                    sumMoneySellHistory = response.data[0].mySum;
                } else {
                    sumMoneySellHistory = 0;
                }
            });  
            
            await Axios.post('http://localhost:3001/summary_money_order', {
                id_card: userData.id_card,
                shortname: "PON"

            }).then((response) => {
                console.log(response.data[0].price_sum);
                if(response.data[0].price_sum !== null){
                    sumMoneyOrder = response.data[0].price_sum;
                } else {
                    sumMoneyOrder = 0;
                }
            }).then(() => {
                money_diff = (sumMoneyDeposit + sumMoneySellHistory) - (sumMoneyOrder + sumMoneyBuyHistory);
            }).then(() => {
                setAvailableMoney(money_diff);
            }).then(() => {
                console.log(availableMoney);
            });; 
            
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
                console.log(availableMoney);
                setDepositStatus(response.data.message);
                setPaymentError(true);
            } else {
                console.log('Hellooo');
                console.log(availableMoney);
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
            <div className="container dashboard_view mt-5">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/deposit">DEPOSIT</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link a-color" href="/withdraw">WITHDRAW</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">

                    </div>
                    <form onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="text-margin">DEPOSIT</div>

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
                                        setDepositMoney(event.target.value)
                                    }}
                                ></input>
                                <p  className = "alert-font">{DepositStatus}</p>
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

export default Deposit;