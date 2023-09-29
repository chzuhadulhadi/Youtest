import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import React from "react";
import './resultpage.css'
function Charts(dataRecieved) {
 const dataArray = dataRecieved.dataRecieved
  if(!dataArray){
      return(
        <div className="resultpage">
          <Line data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
      
          {
            label: "Result",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
          }
        ]   
      }} />
        </div>
      )
  }else{
  var labels=[];
  var values = [];
  var values0=0;
  var values1=0;
  var temp = 0; //no use
  for(let single of dataArray){
    
    labels.push(single.category)
    values.push((single.percentage))
  }
  if(values0==0){
    values = [0,...values]
    labels = ["",...labels]
  }

  if(values1==0){
    values.push(100)
  }
  console.log("temp")
    const data = {
        labels,
        datasets: [
      
          {
            label: "Result",
            data: values,
            fill: false,
            borderColor: "#742774"
          }
        ]   
      };
    return (
        <div className="resultpage">
          <Line data={data} />
        </div>
      );
    }
}

export default Charts;