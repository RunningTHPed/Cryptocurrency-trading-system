import React, { Component } from 'react';
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, useReducer } from 'react' 

const Chart = () => {

    //get role from localStorage
    let userData = JSON.parse(localStorage.getItem("userdata"));
    const [role, setRole] = useState("guest");
    useEffect(() => {
        if (userData != null) {
            setRole(userData.role);
        }
    })

    //variable chart
    const [chart, setchart] = useState({});
    const plotcomp = {
        time_order: [], //time_order is time_when sell
        price: [],
        select_time: [],
        time_date: []
    };

    //variable order
    const [OrderList, setOrderList] = useState([]);
    const [price, setPrice] = useState([]);
    const [Price_per_coin, setPrice_per_coin] = useState([]);


    const addOrder = () => {
        Axios.post('http://localhost:3001/addOrder', {
            price: price,
            Price_per_coin: Price_per_coin
        }).then(() => {
            setOrderList([
                ...OrderList,
                {
                    price: price,
                    Price_per_coin: Price_per_coin
                }
            ])
        })
    }

    //variable sell
    const [SellList, setSellList] = useState([]);
    const [coin, setCoin] = useState([]);
    const [SellPrice_per_coin, setSellPrice_per_coin] = useState([]);

    const addSell = () => {
        Axios.post('http://localhost:3001/addSell', {
            coin: coin,
            SellPrice_per_coin: SellPrice_per_coin
        }).then(() => {
            setSellList([
                ...SellList,
                {
                    coin: coin,
                    SellPrice_per_coin: SellPrice_per_coin
                }
            ])
        })
    }

    //variable history

    //----------------------
    const [hist, sethist] = useState([]);

    useEffect(() => {
        getData();
        getChart();
        console.log(chart)
    }, []);

    const [buyOrder, setBuyOrder] = useState([]);
    const [sellOrder, setSellOrder] = useState([]);

    const iniState = 0

    const reducer = (state, action) => {
        switch(action) {
                case 'one' :
                    return state + 1
                default :
                    return state
            }
        }

    const [dataReducer, setReducer] = useReducer(reducer, iniState);

    const getData = async () => {
        try {
            const res_buy = await Axios.get('http://localhost:3001/getBuy');
            await setBuyOrder(res_buy.data[0]);
            console.log("price_per_coin(buy) = " + buyOrder.price_per_coin);

            const res_sell = await Axios.get('http://localhost:3001/getSell');
            await setSellOrder(res_sell.data[0]);
            console.log("price_per_coin(sell) = " + sellOrder.price_per_coin);
            
            setReducer( {type:'one'} )
            console.log(dataReducer);

            if (buyOrder.price_per_coin >= sellOrder.price_per_coin) {
                if (buyOrder.coin >= sellOrder.coin) {
                    //setBuyOrder(buyOrder.coin[0] - sellOrder.coin[0]);
                    // dispatch( {type:'type1'} )
                    // console.log(data);
                    //insert to coin_transaction_history
                    // Axios.post('http://localhost:3001/add_coin_Transaction', {
                    //     id_card: id_card,
                    //     time_order: time_order,
                    //     shortname: shortname,
                    //     type: type,
                    //     value: value,
                    //     price: price,
                    //     fee: fee
                    // })
                } else {

                }
            } else {

            }


        } catch (error) {
            console.log(error.response);
        }

    }

    const getChart = async () => {
        try {
            const res = await Axios.get('http://localhost:3001/coin_Transaction');
            console.log(res);
            console.log(res.data);
            
            //Loop for show last 10 row
            for (var i = 0; i < res.data.length; i++) {
                plotcomp.price.push(res.data[i].price);
                plotcomp.time_order.push(res.data[i].time_order);
                var onlyTime = new Date(plotcomp.time_order[i]);
                plotcomp.select_time.push(onlyTime.toLocaleTimeString('it-IT'));
                plotcomp.time_date.push(onlyTime.toLocaleString('it-IT'));

                // console.log(res.data[i].time_order);
                // console.log(res.data[i].time_date);
                res.data[i].time_order =  plotcomp.time_date[i];
                // console.log(res.data[i].time_order);
                // console.log(res.data[i].time_date);
            }
            console.log(plotcomp);
            console.log(res.data);

            //---set history table
            sethist(res.data);
            console.log(hist);

            setchart({
                labels: plotcomp.select_time, //get price on this
                //labels: ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00'],

                datasets: [
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
        <div className="">
            <div className="row">

                <div className="col">
                    Column

                </div>

                <div className="col">

                    <div className="chart">
                        <Line data={chart} />
                    </div>


                    <div className="row">
                        <div className="col">
                            <div className="form_buy">

                                <h3>Buy order</h3>
                                <h8> จำนวนเงินที่ต้องการจ่าย </h8>
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
                                <h8> จำนวนเงินต่อเหรียญ </h8>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setPrice_per_coin(event.target.value)
                                    }}
                                />
                                <div>
                                    <a href="/chart" onClick={addOrder}> confrim order</a>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="form_sell">
                                <h3>Sell order</h3>
                                <h8> จำนวนเหรียญที่ต้องการขาย </h8>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setCoin(event.target.value)
                                    }}
                                />

                                <h8> จำนวนเงินต่อเหรียญ </h8>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setSellPrice_per_coin(event.target.value)
                                    }}
                                />
                                <div>
                                    <a href="/chart" onClick={addSell}> confrim sell</a>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
                <div className="col">
                    <div className="list-group">
                        <a href="/market/BTC" className="list-group-item list-group-item-success" aria-current="true">BITCOIN</a>
                        <a href="#" className="list-group-item list-group-item-action">ETHEREUM</a>
                        <a href="#" className="list-group-item list-group-item-action">BINANCE COIN</a>
                        <a href="#" className="list-group-item list-group-item-action">CARDANO</a>
                    </div>

                    <div className="history-table">
                        <h5>LATEST TRADES</h5>
                        <table className="table">
                            <tr>
                                <th>เวลา</th>
                                <th>ราคา</th>
                            </tr>
                            {
                                hist.map(i =>
                                    (<tr>
                                        <td>
                                            { i.time_order }
                                        </td>
                                        <td>
                                            { i.price }
                                        </td>
                                    </tr>)
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chart;

