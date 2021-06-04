import React from 'react';
import { Line, line } from 'react-chartjs-2';
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';

const Chart = () => {

    Axios.defaults.withCredentials = true;
    //get role from localStorage
    var userData = JSON.parse(localStorage.getItem("userdata"));
    const [role, setRole] = useState("guest");
    useEffect(async () => {
        userData = await JSON.parse(localStorage.getItem("userdata"));
        console.log(role)
        if (userData !== null) {
            setRole(userData.role);
        }
    }, [])

    //variable order
    const [OrderList, setOrderList] = useState([]);
    const [price, setPrice] = useState([]);
    const [Price_per_coin, setPrice_per_coin] = useState([]);

    const [availableMoney, setAvailableMoney] = useState(0);
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


    const getSumCoin = async () => {
        try {
            await Axios.post('http://localhost:3001/summary_coin_deposit', {
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                console.log(response.data[0].coin_sum);
                //setSumCoinDeposit(response.data[0].coin_sum);
                if (response.data[0].coin_sum !== null) {
                    sumCoinDeposit = response.data[0].coin_sum;
                } else {
                    sumCoinDeposit = 0;
                }
            });

            await Axios.post('http://localhost:3001/summary_coin_history_sell', {
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                if (response.data[0].coin_sum !== null) {
                    sumCoinSellHistory = response.data[0].coin_sum;
                } else {
                    sumCoinSellHistory = 0;
                }

            });

            await Axios.post('http://localhost:3001/summary_coin_history_buy', {
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                if (response.data[0].coin_sum !== null) {
                    sumCoinBuyHistory = response.data[0].coin_sum;
                } else {
                    sumCoinBuyHistory = 0;
                }
            });

            await Axios.post('http://localhost:3001/summary_coin_order', {
                id_card: userData.id_card,
                shortname: "PON"
            }).then((response) => {
                console.log(response.data[0].coin_sum);
                if (response.data[0].coin_sum !== null) {
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
            await Axios.post('http://localhost:3001/getBuy', {
                shortname: "PON"
            }).then((res) => {
                if (res.data.order[0] !== null) {
                    //setCoinBuy(res.data.order[0].coin);
                    id_card_buy = res.data.order[0].id_card;
                    coin_buy = res.data.order[0].coin;
                    ppc_buy = res.data.order[0].price_per_coin;
                    no_buy = res.data.order[0].no;
                    console.log("get coin_buy: " + coin_buy);
                    console.log("get ppc_buy: " + ppc_buy);
                }
            })

            await Axios.post('http://localhost:3001/getSell', {
                shortname: "PON"
            }).then(async (res) => {
                if (res.data.order[0] !== null) {
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
            await getPayment();
            await getSumCoin();
            console.log("trade ppc_buy: " + ppc_buy);
            console.log("trade ppc_sell: " + ppc_sell);
            if (ppc_buy >= ppc_sell && id_card_buy !== id_card_sell) {
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

                    if (coin_buy === 0) {
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

                    if (coin_sell === 0) {
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


    //variable chart
    const [chart, setchart] = useState({});
    const plotcomp = {
        time_finish: [],
        per_coin: [],
        select_time: [],
        time_date: [],

        time_order_buy: [],
        retime_order_buy: [],

        time_order_sell: [],
        retime_order_sell: []

    };

    //variable history
    const [hist, sethist] = useState([]);
    const [buyhist, setbuyhist] = useState([]);
    const [sellhist, setsellhist] = useState([]);

    const getChart = async () => {
        try {

            // main chart show last 10 row
            const res = await Axios.get('http://localhost:3001/coin_Transaction');
            console.log(res);
            console.log(res.data);
            for (var i = 0; i < res.data.length; i++) {
                plotcomp.per_coin.push(res.data[i].price / res.data[i].value);
                plotcomp.time_finish.push(res.data[i].time_finish);

                var onlyTime = new Date(plotcomp.time_finish[i]);
                plotcomp.select_time.push(onlyTime.toLocaleTimeString('it-IT'));
                plotcomp.time_date.push(onlyTime.toLocaleString('it-IT'));
                res.data[i].time_finish = plotcomp.time_date[i];
            }
            // console.log(plotcomp);
            // console.log(res.data);
            //---set history table
            sethist(res.data);
            console.log(hist);
            console.log(typeof hist);


            // table buy order
            await Axios.post('http://localhost:3001/getBuy', {
                shortname: "PON"
            }).then((res_buy) => {
                console.log(res_buy);
                console.log(res_buy.data.order);
                for (var i = 0; i < res_buy.data.order.length; i++) {
                    plotcomp.time_order_buy.push(res_buy.data.order[i].time_order);
                    var onlyTime_buy = new Date(plotcomp.time_order_buy[i]);
                    plotcomp.retime_order_buy.push(onlyTime_buy.toLocaleString('it-IT'));
                    res_buy.data.order[i].time_order = plotcomp.retime_order_buy[i];
                }
                console.log(res_buy.data.order);
                setbuyhist(res_buy.data.order);
                console.log(buyhist);
            })
            // console.log(plotcomp);
            // console.log(res_buy.data);
            //---set history table

            // table sell order
            await Axios.post('http://localhost:3001/getSellDataDESC', {
                shortname: "PON"
            }).then((res_sell) => {
                console.log(res_sell);
                console.log(res_sell.data.order);
                for (var i = 0; i < res_sell.data.order.length; i++) {
                    plotcomp.time_order_sell.push(res_sell.data.order[i].time_order);
                    var onlyTime_sell = new Date(plotcomp.time_order_sell[i]);
                    plotcomp.retime_order_sell.push(onlyTime_sell.toLocaleString('it-IT'));
                    res_sell.data.order[i].time_order = plotcomp.retime_order_sell[i];
                }
                console.log(res_sell.data.order);
                setsellhist(res_sell.data.order);
                console.log(sellhist);
            })
            // console.log(plotcomp);
            // console.log(res_buy.data);
            //---set history table

            setchart({
                labels: plotcomp.select_time, //get price on this
                //labels: ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00'],

                datasets: [
                    {
                        label: 'Pon Coin',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgb(25, 135, 84)',
                        borderColor: 'rgb(25, 135, 84)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgb(25, 135, 84)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        //data: res.data.price //get time on this
                        data: plotcomp.per_coin,
                        //data: [65, 59, 80, 81, 56, 55, 40]
                    }]
            }
            );


        } catch (error) {
            console.log(error.response);
        }

    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 pt-3 p-5">
                    <h5>ASKS</h5>
                     <table className="table">
                            <tbody>
                                <tr>
                                    <th>Vol(THB)</th>
                                    <th>VOL(PON)</th>
                                    <th>Rate(THB)</th>
                                </tr>
                                {
                                    sellhist.map(
                                    i =>
                                        (<tr className="table-danger">
                                            <td>
                                                {i.price}
                                            </td>
                                            <td>
                                                {i.coin}
                                            </td>
                                            <td>
                                                {i.price_per_coin}
                                            </td>
                                        </tr>))
                                }

                        </tbody>
                    </table>

                    <h5>BIDS</h5>
                     <table className="table">
                            <tbody>
                                <tr>
                                    <th>Vol(THB)</th>
                                    <th>VOL(PON)</th>
                                    <th>Rate(THB)</th>
                                </tr>

                            {
                                buyhist.map(
                                    i =>
                                        (<tr className="table-success">
                                            <td>
                                                {i.price}
                                            </td>
                                            <td>
                                                {i.coin}
                                            </td>
                                            <td>
                                                {i.price_per_coin}
                                            </td>
                                        </tr>))
                                }

                        </tbody>
                    </table>

                </div>

                <div className="col">
                    <div className="chart">
                        <Line data={chart} />
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form_buy">
                                <fieldset className="field_set">
                                    <p>Availible Balance <u>1000</u> THB</p>
                                    <div className="row">
                                        <div className="col">
                                            <p>You Spend</p>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className=""
                                                id="price1"
                                                placeholder=""
                                                required
                                                onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <p>Price Per PON</p>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className=""
                                                id="price1"
                                                placeholder=""
                                                required
                                                onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {role !== "guest" &&
                                        <div className="mt-2">
                                            <Button className="btn-confirm-order" onClick={addOrder} variant="success" block>Confirm order</Button>
                                        </div>
                                    }
                                    {role === "guest" &&
                                        <div  className="mt-2">
                                            <Button className="btn-confirm-order" variant="dark" block>
                                                <a href="/login">Login</a> or <a href="/register">Sign up</a> to trade.
                                            </Button>
                                        </div>
                                    }
                                </fieldset>
                            </div>    
                        </div>
                        <div className="col">
                            <div className="form_sell">
                            <fieldset className="field_set">
                                <p>Availible Balance PON <u>500</u> PON</p>
                                <div className="row">
                                    <div className="col">
                                        <p>You Spend</p>
                                    </div>
                                    <div className="col">
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
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <p>Price Per PON</p>
                                    </div>
                                    <div className="col">
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
                                    </div>
                                </div>
                                {role !== "guest" &&
                                    <div className="mt-2">
                                        <Button className="btn-confirm-order" onClick={addSell} variant="danger" block>Confirm order</Button>
                                    </div>
                                }
                                {role === "guest" &&
                                    <div className="mt-2">
                                        <Button className="btn-confirm-order" variant="dark" block>

                                            <a href="/login">Login</a> or <a href="/register">Sign up</a> to trade.
                                        </Button>
                                    </div>
                                }
                                </fieldset>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-3 pt-3 p-5">
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
                                    <th>Vol</th>
                                </tr>
                                {
                                    hist.map(i =>
                                    (<tr>
                                        <td>
                                            {i.time_finish}
                                        </td>
                                        <td>
                                            {i.price}
                                        </td>
                                        <td>
                                            {i.value}
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

