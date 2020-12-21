import React, { useEffect, useState } from 'react'
import {Line} from 'react-chartjs-2'
import '../assets/LineGraph.css'

function LineGraph() {

  const [graphData, setGraphData] = useState([]);

  const data = 
  [{
    x: 10,
    y: 20
  }, {
    x: 15, 
    y: 10
  }, {
    x: 12,
    y: 4
  }]

  const createMockData = () => {
    let data = [];
    let value = 50;
    for(var i = 0; i < 365; i++) {
      let date = new Date();
      date.setHours(0,0,0,0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
      data.push({x: date, y: value});
    }
    setGraphData(data);
  }

  
  useEffect(()=>{
    createMockData();
  }, []) //will run depending on what data changes
  // will run depending on what data changes 
  // if set to empty array, nothing in there, it will run once when the component is loaded
  // will listen on when the component is loaded
  

  return (
    <div className="linegraph">
      <Line 
        data={{
          datasets: [{
            type: "line",
            data: graphData,
            backgroundColor: "#000000",
            borderColor: "#5AC53B",
            borderWidth: 2,
            pointBorderColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointHoverBackgroundColor: "#5AC53B",
            pointHoverBorderColor: "#000000",
            pointHoverBorderWidth: 4,
            pointHoverRadius: 6
          }]
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  displayFormats: "MM/DD/YY",
                  tooltipFormat: "ll"
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [{
              ticks: {
                display: false
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default LineGraph
