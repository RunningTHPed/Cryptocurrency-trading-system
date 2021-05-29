import React, { Component }  from 'react';
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'


const Chart = () => {
    //variable chart
    const [chart, setchart] = useState({});
    const plotcomp = {
                        time_finish: [],
                        price:[],
                    }; 

    //variable order
    const [TransList, setTransList] = useState([]);                
    const [price, setPrice] = useState([]);
    const [time_finish, setTime_finish] = useState([]);

    const addTransaction = () => {
        Axios.post('http://localhost:3001/add_Transaction',{
            price:price
        }).then(()=> {
            setTransList([
                ...TransList,
                {
                    price:price
                }
            ])
        })
    }

    //variable history

    //----------------------
    const [hist,sethist] = useState([]);

    useEffect(() => {
        getData();
        console.log(chart)
    },[]);

    const getData = async () => {
        try {
                const res = await Axios.get('http://localhost:3001/coin_Transaction');               
                console.log(res);
                console.log(res.data);
                sethist(res.data);

                //Loop for show last 10 row
                for( var i = res.data.length-1 ; i >= 0 ; i-- ){
                    plotcomp.price.push(res.data[i].price);
                    plotcomp.time_finish.push(res.data[i].time_finish);
                }


                //Loop for auto increment
                /*
                for( var i = 0; i <res.data.length  ; i++ ){
                    plotcomp.price.push(res.data[i].price);
                    plotcomp.time_finish.push(res.data[i].time_finish);
                }
                */

                console.log(plotcomp)
                //console.log(res.data[0].time_finish);
                //console.log(res.data[0].price);

                setchart ({

                labels: plotcomp.time_finish, //get price on this
                //labels: ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00'],

                datasets:[
                {
                    label: 'Pon Coin',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    //data: res.data.price //get time on this
                    data: plotcomp.price
                    //data: [65, 59, 80, 81, 56, 55, 40]
                }]
            }
            );


        } catch (error) {
            console.log(error.response);
        }

    };
    return (  
        <div className = "">
            <div className = "row">
                <div className = "col">
                    Column
                </div>
                <div className = "col">
                    <div className = "chart">
                        <Line data = {chart}/>
                    </div>
                    <div className="contrainer-buy">
                <div className="buy-title"> Buy order </div>
                    
                <div className="buy-field">
                    <input 
                        type="text" 
                        className="buy-input" 
                        id="price" 
                        placeholder="" 
                        required 
                        onChange={(event) => {
                            setPrice(event.target.value)
                        }}
                    />
                </div>

                <div className="buy-click">
                    <a href="/chart"  onClick={addTransaction}> confrim order</a>
                </div>
            </div>

<<<<<<< HEAD
            <div className="contrainer-sell">
                <div className="sell-title"> Sell order </div>
                    
                <div className="sell-field">
                    <input 
                        type="text" 
                        className="buy-input" 
                        id="price" 
                        placeholder="" 
                        required 
                        onChange={(event) => {
                            setPrice(event.target.value)
                        }}
                    />
                </div>

                <div className=" sell-click">
                    <a href="/chart"> confrim sell
                    </a>
                </div>
            </div>
                </div>
                <div className = "col">
                    <div className = "list-group">
                        <a href = "/Bitcoin" className = "list-group-item list-group-item-success" aria-current="true">BITCOIN</a>
                        <a href="#" className = "list-group-item list-group-item-action">ETHEREUM</a>
                        <a href="#" className = "list-group-item list-group-item-action">BINANCE COIN</a>
                        <a href="#" className = "list-group-item list-group-item-action">CARDANO</a>
                    </div>

                    <div className="history-table">
                        <h5>LATEST TRADES</h5>
                        <table className = "table">
                            <tr>
                                <th>เวลา</th>
                                <th>ราคา</th>
                            </tr>
                            {
                                hist.map (i=>
                                            (   <tr>
                                                    <td>
                                                        {i.time_finish}
                                                    </td> 
                                                    <td> 
                                                        {i.price} 
                                                    </td>
                                                </tr>
                                            )
                                        )
                            }
                        </table>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
=======
            <div className="history-table">
                <table border='2'>
                    <tr>
                        <th>เวลา</th>
                        <th>ราคา</th>
                    </tr>
                    {
                        hist.map (i=>
                                    ( <tr>
                                        <td>
                                            {i.time_finish}
                                        </td> 
                                        <td> 
                                            {i.price} 
                                        </td>
                                    </tr>)
                                )
                    }
                </table>
            </div>
>>>>>>> parent of e56fbe12 (chart)
            
=======
>>>>>>> parent of 99023d22 (Revert "chart")
        </div>               
    )   
}

export default Chart;

