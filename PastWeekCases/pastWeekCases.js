import React, { Component} from "react";
import {Bar} from "react-chartjs-2";



class PastWeek extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { pastWeek } = this.props;

    let data = {
      labels: pastWeek[0],
      datasets: [
         {
            label: "Last 7 Days Reported Data",
            data: pastWeek[1],
            lineTension: 0.3,
            backgroundColor: "mediumslateblue"
         }
      ]
    }
    return (
      <div className="chart-past-week">
        <Bar
          data={data}
          width={300}
          height={500}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Past Week'
            },
            legend: {
              display: true,
              position: 'bottom',
              fontSize: 25,
              align: 'center'

            },
            elements: {
                    point:{
                        radius: 0
                    }
                }
          }}
        />
      </div>
    )
  }
}

export default PastWeek;
