import React, { Component} from "react";
import {Line} from "react-chartjs-2";


import {fetchAllData} from "../Util/api_util";
import { filterWeekData } from "./helper";

import PastWeek from "../PastWeekCases/pastWeekCases";

class LineTotalCases extends Component{
  constructor(props){
    super(props);
    this.state = {
      rawData: {},
      pastWeek: [],
      formattedData: {
        labels: [],
        datasets: [
	         {
  	          label: "Corona Virus Cases In San Francisco",
 	            data: [],
 	            lineTension: 0.3,
              backgroundColor: "#8465cb"
	         }
        ]
      }
    }

  }


  componentDidMount(){

      let case_count = [];
      let all_dates = [];

      let formattedData = {
        labels: [],
        datasets: [
	         {
  	          label: "Corona Virus Cases In San Francisco",
 	            data: [],
 	            lineTension: 0.3,
              backgroundColor: "#8465cb"
	         }
        ]
      };

      fetchAllData().then(res => {

        let total_cases = 0;

        res.forEach(function (e) {
          total_cases += Number(e.case_count);
          case_count.push(total_cases);
          all_dates.push(e.specimen_collection_date.slice(5,10));

        });

        ////////////////////////////for secondary component for past few days cases
        let last_few_days = [];

        for(let i=1; i<= 30;i++){
          last_few_days.push(res[res.length -Number(i)]);
        }
        let recent_days = filterWeekData(total_cases, last_few_days);

        formattedData.labels = all_dates;
        formattedData.datasets[0].data = case_count;
        formattedData.datasets[0].label = `Corona Virus Cases - Total: ${total_cases}`;

        this.setState({formattedData: formattedData, pastWeek: recent_days})

      });
  }

  render(){
    return (
      <>
      <div className="chart-total-cases">
        <Line
          data={this.state.formattedData}
          width={100}
          height={320}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Corona Virus Cases - San Francisco',
              fontSize: 25,

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
      <PastWeek pastWeek={this.state.pastWeek}/>
      </>
    )
  }
}

export default LineTotalCases;
