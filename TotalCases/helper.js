export const filterWeekData = function(total, past_days){

  let formattedObject = {};

  for(let i =0; i< past_days.length; i++){

    if(formattedObject[past_days[i].specimen_collection_date.slice(5,10)]){

      formattedObject[past_days[i].specimen_collection_date.slice(5,10)] += Number(past_days[i].case_count);
    } else {
      formattedObject[past_days[i].specimen_collection_date.slice(5,10)] = Number(past_days[i].case_count);
    }
  }
  let dates = formattedObject;
  let keys = Object.keys(dates).slice(0,7).reverse();
  let values = Object.values(dates).slice(0,7).reverse();
  return [keys, values];
}
