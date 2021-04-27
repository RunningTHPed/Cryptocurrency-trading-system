import React from 'react';
import {Line, line} from 'react-chartjs-2';

const data = {
  labels: ['00.00', '01.00', '02.00', '03.00', '04.00', '05.00', '06.00'],
  datasets:[
      {
      label: 'Pon Coin',
      fill: false,
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
      data: [65, 59, 80, 81, 56, 55, 40]
      }
  ]
};

const Chart = () => {
    return (
        <div>
            <h1>เทรดกับพลเพื่อคนอย่างแต๋น</h1>
            <Line
                data = {data}
            />
        </div>
    )   
}

export default Chart;