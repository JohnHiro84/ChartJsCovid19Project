import React, { Component} from "react";
import {Bar} from "react-chartjs-2";
import {fetchEthnicityData} from "../Util/api_util";

class EthnicityCases extends Component{
  constructor(props){
    super(props);
    this.state = {

      rawData: {},
      formattedData: {
        labels: [],
        datasets: [
	         {
  	          label: "Corona Virus Cases by Ethnicity",
 	            data: [],
 	            lineTension: 0.3,
              backgroundColor: "#287283"
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
  	          label: "Corona Virus Cases by Ethnicity",
 	            data: [],
 	            lineTension: 0.3,
              backgroundColor: "#287283"
	         }
        ]
      };

      fetchEthnicityData().then(res => {

        let total_cases = 0;

        let cases = {
          "Native American": 0,
          "Other": 0,
          "Native Hawaiian or Other Pacific Islander": 0,
          "Multi-racial": 0,
          "Asian": 0,
          "Unknown": 0,
          "White": 0,
          "Hispanic or Latino/a, all races": 0
        }
        res.forEach(function (e) {

          total_cases += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Native American") cases["Native American"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Asian") cases["Asian"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Native Hawaiian or Other Pacific Islander") cases["Native Hawaiian or Other Pacific Islander"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "White") cases["White"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Unknown") cases["Unknown"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Hispanic or Latino/a, all races") cases["Hispanic or Latino/a, all races"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Multi-racial") cases["Multi-racial"] += Number(e.new_confirmed_cases);
          if(e.race_ethnicity === "Other") cases["Other"] += Number(e.new_confirmed_cases);

        });

        formattedData.labels = Object.keys(cases);
        formattedData.datasets[0].data = Object.values(cases);

        this.setState({formattedData: formattedData});

      });
  }

  render(){
    return (
      <div className="chart-ethnicity">
        <Bar
          data={this.state.formattedData}
          width={100}
          height={350}
          options={{
            maintainAspectRatio: false,
            title: {
              display: false,
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

export default EthnicityCases;
