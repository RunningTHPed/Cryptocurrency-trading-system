import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-nofixed';
import { Button } from 'react-bootstrap'

function Dashboard() {

    const [DataPayment, setDataPayment] = useState([]);
    const[availableMoney, setAvailableMoney] = useState(0);
    const[DetailCoin, setDetailCoin] = useState([]);

    const getData = async () => {
        try {
            const res = await Axios.post('http://localhost:3001/get_detail_coin', {
                IDCard: userData.id_card
            });
            console.log(res.data);
            setDetailCoin(res.data);
        }
        catch (error) {
            console.log(error.response);
        }
    }

    //const [availableMoney, setAvailableMoney] = useState(0);
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
        getData();
        getPayment();
        analysis();
    }, []);



    // const coin = {
    //     labels: [
    //         'Bitcoin',
    //         'ETHEREUM',
    //         'BINANCE COIN',
    //         'CARDANO',
    //         'dummy coin1',
    //         'dummy coin2',
    //         'dummy coin3'
    //     ],
    //     datasets: [{

    //         label: 'Max value',
    //         data: [65, 59, 90, 81, 96, 55, 70],
    //         fill: true,
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgb(255, 99, 132)',
    //         pointBackgroundColor: 'rgb(255, 99, 132)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgb(255, 99, 132)'
    //     }, {
    //         label: 'Min value',
    //         data: [28, 48, 40, 19, 46, 27, 20],
    //         fill: true,
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgb(54, 162, 235)',
    //         pointBackgroundColor: 'rgb(54, 162, 235)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgb(54, 162, 235)'
    //     }]
    // };

    const [coin, setcoin] = useState({});
    const coincomp = {
        shortname: [],
        max: [],
        min: []
    };

    const analysis = async () => {
        try {
            const res_coin = await Axios.get('http://localhost:3001/coin_analysis');
            console.log(res_coin);
            console.log(res_coin.data);
            for (var i = 0; i < res_coin.data.length; i++) {
                coincomp.shortname.push(res_coin.data[i].shortname);
                coincomp.max.push(res_coin.data[i].max);
                coincomp.min.push(res_coin.data[i].min);
            }
            console.log(coincomp);

            setcoin({
                //labels: coincomp.shortname,
                labels: [
                    'Bitcoin',
                    'ETHEREUM',
                    'BINANCE COIN',
                    'CARDANO',
                    'dummy coin1',
                    'dummy coin2',
                    'dummy coin3'
                ],

                datasets: [{
                    label: 'Max value',
                    //data: coincomp.max,
                    data: [65, 59, 90, 81, 96, 55, 70],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'Min value',
                    //data: coincomp.min,
                    data: [28, 48, 40, 19, 46, 27, 20],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            })
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div>
        <div className="bg-all-dash pt-5">
            <div className="container dashboard_view">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col mt-2">
                                <h3>BIG PICTURE</h3>
                            </div>
                        </div>
                        <div className="chart-dashboard">
                            <Radar
                                data={coin}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="row mt-4">
                            <div className="col text-col-money">
                                <h4>Available</h4>
                            </div>
                            <div className="col-3">
                                <h3>{availableMoney}</h3>
                            </div>
                            <div className="col-2">
                                <h4>THB</h4>
                            </div>
                        </div>
                        <div className="bg-dash-data">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">COIN</th>
                                    <th scope="col">Rate (THB)</th>
                                    <th scope="col">24 High</th>
                                    <th scope="col">24 Low</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        DetailCoin.map(i => (
                                            <tr>
                                                <td>{i.shortname}</td>
                                                <td>30</td>
                                                <td>{i.max} THB</td>
                                                <td>{i.min} THB</td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-margin-dashboard">
                            <a className="btn btn-success btn-trade" href="/market/PON" role="button">TRADE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default Dashboard;
