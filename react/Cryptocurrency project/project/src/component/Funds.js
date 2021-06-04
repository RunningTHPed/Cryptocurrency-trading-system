import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, state } from 'react'
import Footer from './Footer-fixed';

function Funds() {

    const[DataPayment, setDataPayment] = useState([]);

    let userData = JSON.parse(localStorage.getItem("userdata"));

    const getPayment = async () => {
        try {
            const res = await Axios.post('http://localhost:3001/show_money', {
                IDCard: userData.id_card
            });               
            console.log(res.data[0]);
            setDataPayment(res.data[0]);
        }
        catch (error) {
            console.log(error.response);
        }
    }
    
    useEffect(() => {
        getPayment();
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
                            <td>{DataPayment.mySum}</td>
                            <td><a class="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a class="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>PonCoin</td>
                            <td>0</td>
                            <td><a class="btn btn-success" href="/deposit/pon" role="button">DEPOSIT</a></td>
                            <td><a class="btn btn-danger" href="/withdraw/pon" role="button">WITHDRAW</a></td>
                            <td><a class="btn btn-warning" href="#" role="button">TRADE</a></td>

                        </tr>
                        <tr>
                            <td>Ethereum</td>
                            <td>0.123</td>
                            <td><a class="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a class="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a class="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                        <tr>
                            <td>BNB Coin</td>
                            <td>0</td>
                            <td><a class="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a class="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a class="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                        <tr>
                            <td>Cardano</td>
                            <td>0</td>
                            <td><a class="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a class="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a class="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                        <tr>
                            <td>FuckCoin</td>
                            <td>1,000.00</td>
                            <td><a class="btn btn-success" href="/deposit" role="button">DEPOSIT</a></td>
                            <td><a class="btn btn-danger" href="/withdraw" role="button">WITHDRAW</a></td>
                            <td><a class="btn btn-warning" href="#" role="button">TRADE</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <Footer />
        </div>
    );
}

export default Funds;