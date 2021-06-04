import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function Withdraw() {
    const [WithdrawMoney, setWithdrawMoney] = useState("");
    const [DataPayment, setDataPayment] = useState([]);
    const [WithdrawStatus, setWithdrawStatus] = useState("");

    const [availableMoney, setAvailableMoney] = useState(0);
    const [inorder, setInOrder] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

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
                if (response.data[0].mySum !== null) {
                    sumMoneyBuyHistory = response.data[0].mySum;
                } else {
                    sumMoneyBuyHistory = 0;
                }
            });

            await Axios.post('http://localhost:3001/summary_money_history_sell', {
                id_card: userData.id_card
            }).then((response) => {
                if (response.data[0].mySum !== null) {
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
                if (response.data[0].price_sum !== null) {
                    sumMoneyOrder = response.data[0].price_sum;
                } else {
                    sumMoneyOrder = 0;
                }
            }).then(() => {
                money_diff = (sumMoneyDeposit + sumMoneySellHistory) - (sumMoneyOrder + sumMoneyBuyHistory);
            }).then(() => {
                setInOrder(sumMoneyOrder);
                setAvailableMoney(money_diff);
                setTotalBalance(sumMoneyDeposit + sumMoneySellHistory + sumMoneyOrder)
            }).then(() => {
                console.log(inorder);
                console.log(availableMoney);
            });;

        }
        catch (error) {
            console.log(error.response);
        }
    }

    const Withdraw = () => {
        Axios.post('http://localhost:3001/withdraw_money', {
            IDCard: userData.id_card,
            WithdrawMoney: WithdrawMoney,
            Availible: availableMoney
        }).then((response) => {
            if (response.data.message) {
                setWithdrawStatus(response.data.message);
            } else {
                window.location = "/dashboard"
            }
        })
    }

    useEffect(() => {
        getPayment();
    }, []);

    const mystyle = {
        position: "absolute",
        cursor: "inherit"
    };

    return (
        <div>
            <div className="container dashboard_view">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link a-color" aria-current="page" href="/deposit">DEPOSIT</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/withdraw">WITHDRAW</a>
                    </li>
                </ul>
                <div className="background-cc">
                    <div className="pt-4 p-3">

                    </div>
                    <form onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="text-margin">WITHDRAW</div>
                        <div className="row ">
                            <div className="col input-margin">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Available balance</td>
                                            <td style={{textAlign: 'right'}}>{availableMoney}</td>
                                            <td>THB</td>
                                        </tr>
                                        <tr>
                                            <td>Total balance</td>
                                            <td style={{textAlign: 'right'}}>{totalBalance}</td>
                                            <td>THB</td>

                                        </tr>
                                        <tr>
                                            <td>In order</td>
                                            <td style={{textAlign: 'right'}}>{inorder}</td>
                                            <td>THB</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="col input-margin2 background-cc-margin">
                                <input type="text" className="form-control" id="BranchName" placeholder="Withdraw amount"
                                    onChange={(event) => {
                                        setWithdrawMoney(event.target.value)
                                    }}
                                ></input>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Fee</td>
                                            <td>0 %</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="alert-font">{WithdrawStatus}</p>
                                <a className="btn btn-danger btn-margin-withdraw" href="#" role="button" onClick={Withdraw}>WITHDRAW</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Withdraw;