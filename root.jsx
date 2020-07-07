import React from 'react';

import { Route, HashRouter, Link } from "react-router-dom";

import TotalCases from "./TotalCases/totalCasesChart";
import EthnicityCases from "./EthnicityCases/ethnicityCases";
import AgeCases from "./AgeCases/AgeCases";
import GenderCases from "./GenderCases/genderCases";


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.interval = "";

  }

  render() {
    return (
      <div id="page-container">

        <TotalCases />
        <GenderCases />
        <AgeCases />
        <EthnicityCases />

      </div>
    )
  }
}
export default Root;
