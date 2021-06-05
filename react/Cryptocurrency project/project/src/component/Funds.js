import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function Funds() {

    const[availableMoney, setAvailableMoney] = useState(0);
    var money_diff = 0;
    var sumMoneyDeposit = 0;
    var sumMoneyOrder = 0;
    var sumMoneySellHistory = 0;
    var sumMoneyBuyHistory = 0;

    const [availableCoin, setAvailableCoin] = useState(0);
    var coin_diff = 0;
    var sumCoinDeposit = 0;
    var sumCoinOrder = 0;
    var sumCoinSellHistory = 0;
    var sumCoinBuyHistory = 0;

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
    

    const getSumCoin = async () => {
        try {
            await Axios.post('http://localhost:3001/summary_coin_deposit',{
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                console.log(response.data[0].coin_sum);
                //setSumCoinDeposit(response.data[0].coin_sum);
                if(response.data[0].coin_sum !== null){
                    sumCoinDeposit = response.data[0].coin_sum;
                } else {
                    sumCoinDeposit = 0;
                }
            });

            await Axios.post('http://localhost:3001/summary_coin_history_sell',{
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                if(response.data[0].coin_sum !== null){
                    sumCoinSellHistory = response.data[0].coin_sum;
                } else {
                    sumCoinSellHistory = 0;
                }
                
            });

            await Axios.post('http://localhost:3001/summary_coin_history_buy',{
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                if(response.data[0].coin_sum !== null){
                    sumCoinBuyHistory = response.data[0].coin_sum;
                } else {
                    sumCoinBuyHistory = 0;
                }
            });

            await Axios.post('http://localhost:3001/summary_coin_order',{
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                console.log(response.data[0].coin_sum);
                if(response.data[0].coin_sum !== null){
                    sumCoinOrder = response.data[0].coin_sum;
                } else {
                    sumCoinOrder = 0;
                }
                
            }).then(() => {
                // console.log("sumCoinDeposit: " + sumCoinDeposit);
                // console.log("sumCoinOrder: " + sumCoinOrder);
                coin_diff = (sumCoinDeposit + sumCoinBuyHistory) - (sumCoinOrder + sumCoinSellHistory);
            }).then(() => {
                // console.log(coin_diff);
                setAvailableCoin(coin_diff);
            }).then(() => {
                console.log(availableCoin);
            });
            
        }
        catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await getPayment();
            await getSumCoin();
        }
        fetchData();

    }, []);

    return (
        <div>
            <div className="container dashboard_view">
                <div className="">
                    <h2>MY WALLET</h2>
                </div>
                <table className="table table-striped table-background mt-3">
                    <thead>
                        <tr>
                            <th scope="col">COIN</th>
                            <th scope="col">AVAILABLE</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Thai Baht</td>
                            <td>{availableMoney}</td>
                            <td><a className="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a className="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>PonCoin</td>
                            <td>{availableCoin}</td>
                            <td><a className="btn btn-success" href="/deposit/pon" role="button">DEPOSIT</a></td>
                            <td><a className="btn btn-danger" href="/withdraw/pon" role="button">WITHDRAW</a></td>
                            <td><a className="btn btn-warning" href="#" role="button">TRADE</a></td>

                        </tr>
                        <tr>
                            <td>Ethereum</td>
                            <td>0.123</td>
                            <td><a className="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a className="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a className="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                        <tr>
                            <td>BNB Coin</td>
                            <td>0</td>
                            <td><a className="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a className="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a className="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                        <tr>
                            <td>Cardano</td>
                            <td>0</td>
                            <td><a className="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a className="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a className="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                        <tr>
                            <td>FuckCoin</td>
                            <td>1,000.00</td>
                            <td><a className="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a className="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a className="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <Footer />
        </div>
    );
}

export default Funds;