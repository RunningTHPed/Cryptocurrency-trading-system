import React, { Component } from 'react'
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'
import Footer from './Footer-fixed';

function Dashboard() {

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
        <div className="container dashboard_view">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-2">
                            <h3>PonCoin</h3>
                        </div>
                        <div className="col text-price">
                            <p>Last Price</p>
                            <p>1 PonCoin = 100 บาท</p>
                        </div>
                    </div>
                    <div className = "chart-dashboard">
                        {/* <Line data = {dashboard}/> */}
                    </div>
                </div>
                <div className="col">
                    <div className="row mt-4">
                        <div className="col text-col-money">
                            <h4>Available</h4>
                        </div>
                        <div className = "col-3">
                            <h3>{DataPayment.mySum}</h3>
                        </div>
                        <div className="col-2">
                            <h4>THB</h4>
                        </div>
                    </div>
                    <div className="btn-margin">
                        <a class="btn btn-success btn-trade" href="/market" role="button">TRADE</a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Dashboard;
