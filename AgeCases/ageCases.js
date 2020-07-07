import React, { Component} from "react";
import {Bar} from "react-chartjs-2";
import {fetchAgeData} from "../Util/api_util";



class AgeCases extends Component{
  constructor(props){
    super(props);
    this.state = {
      rawData: {},
      formattedData: {
        labels: [],
        datasets: [
	         {
  	          label: "Age Groups",
 	            data: [],
 	            lineTension: 0.3,
              backgroundColor: "#FFC300"
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
  	          label: "Cases by Age Groups",
 	            data: [],
 	            lineTension: 0.3,
              backgroundColor: "#FFC300"
	         }
        ]
      };

      fetchAgeData().then(res => {

        let total_cases = 0;

        let cases = {
          "under 18": 0,
          "18-30": 0,
          "31-40": 0,
          "41-50": 0,
          "51-60": 0,
          "61-70": 0,
          "71-80": 0,
          "81+": 0
        }
        res.forEach(function (e) {
          total_cases += Number(e.new_confirmed_cases);
          if(e.age_group === "under 18") cases["under 18"] += Number(e.new_confirmed_cases);
          if(e.age_group === "18-30") cases["18-30"] += Number(e.new_confirmed_cases);
          if(e.age_group === "31-40") cases["31-40"] += Number(e.new_confirmed_cases);
          if(e.age_group === "41-50") cases["41-50"] += Number(e.new_confirmed_cases);
          if(e.age_group === "51-60") cases["51-60"] += Number(e.new_confirmed_cases);
          if(e.age_group === "61-70") cases["61-70"] += Number(e.new_confirmed_cases);
          if(e.age_group === "71-80") cases["71-80"] += Number(e.new_confirmed_cases);
          if(e.age_group === "81+") cases["81+"] += Number(e.new_confirmed_cases);

        });
        formattedData.labels = Object.keys(cases);
        formattedData.datasets[0].data = Object.values(cases);

        this.setState({formattedData: formattedData})

      });
  }

  render(){

    return (
      <div className="chart-age">
        <Bar
          data={this.state.formattedData}
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false,

            title: {
              display: true,
              text: 'Age Group'
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

export default AgeCases;
