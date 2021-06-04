import React, { Component } from 'react';
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect, useReducer } from 'react'
import { Button } from 'react-bootstrap';

const Chart = () => {

    Axios.defaults.withCredentials = true;

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


    const addOrder = async () => {
        await Axios.post('http://localhost:3001/addOrder', {
            id_card: userData.id_card,
            shortname: 'PON',
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
        });
        await getData();
        await tradingAlgo();
    }

    //variable sell
    const [SellList, setSellList] = useState([]);
    const [coin, setCoin] = useState([]);
    const [SellPrice_per_coin, setSellPrice_per_coin] = useState([]);

    const addSell = async () => {
        await Axios.post('http://localhost:3001/addSell', {
            id_card: userData.id_card,
            shortname: 'PON',
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
        });
        await getData();
        await tradingAlgo();
    }

    //variable history

    //----------------------
    const [hist, sethist] = useState([]);

    var coin_buy;
    var ppc_buy;
    var no_buy;
    var id_card_buy = ' ';

    var coin_sell;
    var ppc_sell;
    var no_sell;
    var id_card_sell = ' ';

    var diff_coin = 0;


    async function getData() {
        try {
            await Axios.get('http://localhost:3001/getBuy').then((res) => {
                if (res.data.order[0] != null) {
                    //setCoinBuy(res.data.order[0].coin);
                    id_card_buy = res.data.order[0].id_card;
                    coin_buy = res.data.order[0].coin;
                    ppc_buy = res.data.order[0].price_per_coin;
                    no_buy = res.data.order[0].no;
                    console.log("get coin_buy: " + coin_buy);
                    console.log("get ppc_buy: " + ppc_buy);
                }
            })

            await Axios.get('http://localhost:3001/getSell').then(async (res) => {
                if (res.data.order[0] != null) {
                    //setCoinSell(res.data.order[0].coin);
                    id_card_sell = res.data.order[0].id_card;
                    coin_sell = res.data.order[0].coin;
                    ppc_sell = res.data.order[0].price_per_coin;
                    no_sell = res.data.order[0].no;
                    console.log("get coin_sell = " + coin_sell);
                    console.log("get ppc_sell = " + ppc_sell);
                }
            })

        } catch (error) {
            console.error(error);
        }
    }

    async function tradingAlgo() {
        try {
            console.log("trade ppc_buy: " + ppc_buy);
            console.log("trade ppc_sell: " + ppc_sell);
            if (ppc_buy >= ppc_sell && id_card_buy != id_card_sell) {
                if (coin_buy >= coin_sell) {
                    diff_coin = coin_sell;
                    // consolesetCoinBuy(coin_buy-coin_sell);
                    coin_buy -= coin_sell;
                    console.log(coin_buy);
                    console.log("trade coin_buy: " + coin_buy);
                    //setCoinSell(0);
                    coin_sell = 0;

                    await Axios.post('http://localhost:3001/updateCoin', {
                        coin: coin_buy,
                        no: no_buy,
                        //shortname: shortname,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    })

                    await Axios.post('http://localhost:3001/updateCoin', {
                        coin: coin_sell,
                        no: no_sell,
                        //shortname: shortname,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    })

                    await Axios.post('http://localhost:3001/updateStatus', {
                        no: no_sell,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    })

                    if (coin_buy == 0) {
                        await Axios.post('http://localhost:3001/updateStatus', {
                            no: no_buy,
                        }).then((response) => {
                            if (response.data.message) {
                                console.log(response.data.message);
                            }
                        })
                    }

                    //insert to coin_transaction_history
                    await Axios.post('http://localhost:3001/add_coin_Transaction', {
                        no_order: no_buy,
                        shortname: 'PON',
                        type: 0, //buy
                        value: diff_coin,
                        price: diff_coin * ppc_sell,
                    }).then(() => { console.log("Add transaction history success"); })

                    await Axios.post('http://localhost:3001/add_coin_Transaction', {
                        no_order: no_sell,
                        shortname: 'PON',
                        type: 1, //sell
                        value: diff_coin,
                        price: diff_coin * ppc_sell,
                    }).then(() => { console.log("Add transaction history success"); })
                } else {
                    diff_coin = coin_buy;
                    //setCoinSell(coin_sell-coin_buy);
                    coin_sell -= coin_buy;
                    //setCoinBuy(0);
                    coin_buy = 0;

                    await Axios.post('http://localhost:3001/updateCoin', {
                        coin: coin_buy,
                        no: no_buy,
                        //shortname: shortname,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    })

                    await Axios.post('http://localhost:3001/updateCoin', {
                        coin: coin_sell,
                        no: no_sell,
                        //shortname: shortname,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    })

                    await Axios.post('http://localhost:3001/updateStatus', {
                        no: no_buy,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    })

                    if (coin_sell == 0) {
                        await Axios.post('http://localhost:3001/updateStatus', {
                            no: no_sell,
                        }).then((response) => {
                            if (response.data.message) {
                                console.log(response.data.message);
                            }
                        })
                    }

                    //insert to coin_transaction_history
                    await Axios.post('http://localhost:3001/add_coin_Transaction', {
                        no_order: no_buy,
                        type: 0, //buy
                        shortname: 'PON',
                        value: diff_coin,
                        price: diff_coin * ppc_sell,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    });

                    await Axios.post('http://localhost:3001/add_coin_Transaction', {
                        no_order: no_sell,
                        type: 1, //sell
                        shortname: 'PON',
                        value: diff_coin,
                        price: diff_coin * ppc_sell,
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        }
                    });
                }
            }

            console.log("coin_buy = " + coin_buy);
            console.log("ppc_buy = " + ppc_buy);
            console.log("coin_sell = " + coin_sell);
            console.log("ppc_sell = " + ppc_sell);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getChart();
    }, []);

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
                res.data[i].time_order = plotcomp.time_date[i];
                // console.log(res.data[i].time_order);
                // console.log(res.data[i].time_date);
            }
            // console.log(plotcomp);
            // console.log(res.data);

            //---set history table
            sethist(res.data);
            // console.log(hist);

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
                                <h6> จำนวนเงินที่ต้องการจ่าย </h6>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price1"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setPrice(event.target.value)
                                    }}
                                />
                                <h6> จำนวนเงินต่อเหรียญ </h6>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price2"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setPrice_per_coin(event.target.value)
                                    }}
                                />
                                {role != "guest" &&
                                    <div>
                                        <br />
                                        <Button onClick={addOrder} variant="success" block>Confirm order</Button>
                                    </div>
                                }
                                {role == "guest" &&
                                    <div>
                                        <br />
                                        <Button variant="dark" block>
                                            <a href="/login">Login</a> or <a href="/register">Sign up</a> to trade.
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="col">
                            <div className="form_sell">
                                <h3>Sell order</h3>
                                <h6> จำนวนเหรียญที่ต้องการขาย </h6>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price3"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setCoin(event.target.value)
                                    }}
                                />

                                <h6> จำนวนเงินต่อเหรียญ </h6>
                                <input
                                    type="text"
                                    className="buy-input"
                                    id="price4"
                                    placeholder=""
                                    required
                                    onChange={(event) => {
                                        setSellPrice_per_coin(event.target.value)
                                    }}
                                />
                                {role != "guest" &&
                                    <div>
                                        <br />
                                        <Button onClick={addSell} variant="danger" block>Confirm order</Button>
                                    </div>
                                }
                                {role == "guest" &&
                                    <div>
                                        <br />
                                        <Button variant="dark" block>

                                            <a href="/login">Login</a> or <a href="/register">Sign up</a> to trade.
                                        </Button>
                                    </div>
                                }
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
                            <tbody>
                                <tr>
                                    <th>เวลา</th>
                                    <th>ราคา</th>
                                </tr>
                                {
                                    hist.map(i =>
                                    (<tr>
                                        <td>
                                            {i.time_order}
                                        </td>
                                        <td>
                                            {i.price}
                                        </td>
                                    </tr>)
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chart;

