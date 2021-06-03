import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
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

    const coin = {
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
            data: [28, 48, 40, 19, 46, 27, 20],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    return (
        <div className="container dashboard_view">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col mt-2">
                            <h3>BIG PICTURE</h3>
                        </div>
                    </div>
                    <div className = "chart-dashboard">
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
