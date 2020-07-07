import $ from 'jquery';
import {data} from "../api/api";



export const fetchAllData = function() {

  let promise = $.ajax({
    url: "https://data.sfgov.org/resource/tvq9-ec9w.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : `${data.apiKey}`
    }
  })
  return promise;
}


export const fetchEthnicityData = function() {

  let promise = $.ajax({
    url: "https://data.sfgov.org/resource/vqqm-nsqg.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : `${data.apiKey}`
    }
  })
  return promise;
}

export const fetchGenderData = function() {

  let promise = $.ajax({
    url: "https://data.sfgov.org/resource/nhy6-gqam.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : `${data.apiKey}`
    }
  })
  return promise;
}

export const fetchAgeData = function() {

  let promise = $.ajax({
    url: "https://data.sfgov.org/resource/sunc-2t3k.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : `${data.apiKey}`
    }
  })
  return promise;
}
