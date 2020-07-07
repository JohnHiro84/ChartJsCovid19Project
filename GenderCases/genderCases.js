import React, { Component} from "react";
import {Pie} from "react-chartjs-2";
import {fetchGenderData} from "../Util/api_util";

class GenderCases extends Component{
  constructor(props){
    super(props);
    this.state = {
      rawGenderData: {},
      malepercent: "66%",
      femalepercent: "33%",
      data:{
          datasets: [{
              data: [10, 20],
              backgroundColor: [
                "#C70039",
                "#FF5739"
              ],
              hoverBackgroundColor: [
                'red',
                'orange'
              ]
          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              "Male: 50%",
              "Female: 50%"
          ]
      }

    }
    this.fetchData = this.fetchData.bind(this);

  }

  componentDidMount(){
      // fetchGenderData().then(res => this.setState({rawGenderData: res}));
      let total_cases = 0;
      let male_cases = 0;
      let female_cases = 0;
      fetchGenderData().then(res => {

        res.forEach(function (e) {

          total_cases += Number(e.new_confirmed_cases);
          if(e.gender === "Male") { male_cases += Number(e.new_confirmed_cases)}
          if(e.gender === "Female") { female_cases += Number(e.new_confirmed_cases)}

        });

        this.fetchData(total_cases, male_cases, female_cases);

      });

  }


  fetchData(total, male, female){
    let data ={
              datasets: [{
                  data: [5,5],
                  backgroundColor: [
                    "#C70039",
                    "#FF5739"
                  ],
                  hoverBackgroundColor: [
                    'red',
                    'orange'
                  ]
              }],

              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                  "M",
                  "F"
              ]
          };
          data.datasets[0].data = [male, female];
          const {malepercent, femalepercent} = this.state;

          data.labels = [
            ("Male:" + ((male/total)* 100).toFixed(0).toString()) + "%",
            ("Female:" + ((female/total)* 100).toFixed(0).toString())+ "%"
          ]

    this.setState({data: data});
  }



  render(){

    return (
      <div className="chart-gender">
        <Pie
          data={this.state.data}
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Gender'
            },
            cutoutPercentage: 50,
            legend: {
              display: true,
              position: 'bottom',
              fontSize: 25

            }
          }}
        />
      </div>
    )
  }
}

export default GenderCases;
