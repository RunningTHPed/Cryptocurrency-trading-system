import React, { Component }  from 'react';
import {Line, line} from 'react-chartjs-2';
import Axios from 'axios'
import { useState , useEffect, state} from 'react'


const Chart = () => {
    const [chart, setchart] = useState({});
    const plotcomp = {
                        time_finish: [],
                        price:[],
                    }; 

    
    const [TransList, setTransList] = useState([]);                
    const [price, setPrice] = useState([]);

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


    useEffect(() => {
        getData();
        console.log(chart)
    },[]);

    const getData = async () => {
        try {
                const res = await Axios.get('http://localhost:3001/coin_transaction_history');               
                console.log(res);
                console.log(res.data);

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
                //labels: res.data.time_finish, //get price on this
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
                }
                ]
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div className="salogan">

            <h1>เทรดกับพลเพื่อคนอย่างแต๋น</h1>
            <Line
                data = {chart}
            />

            <div className="tran">
                <label htmlFor="phonenumber">ซื้อเหรียญมั้ยจ้ะ</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="price" 
                    placeholder="" 
                    required 
                    onChange={(event) => {
                        setPrice(event.target.value)
                    }}
                 />
            </div>

            <button className="btn btn-primary btn-lg btn-block mb-3" onClick={addTransaction} type="showUser">กดเพื่อเสียเงิน</button>

        </div>
    )   
}

export default Chart;

//<button className="btn btn-primary btn-lg btn-block mb-3" onClick={transPrice} type="showUser">กดเพื่อเสียเงิน</button><br/><br/>

/*
<div className="tran">
                <label htmlFor="phonenumber">ซื้อเหรียญมั้ยจ้ะ</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="phonenumber" 
                    placeholder="" 
                    required 
                    onChange={(event) => {
                        setPrice(event.target.value)
                    }}
                 />
            </div>
*/