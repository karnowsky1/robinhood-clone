import React, { useEffect, useState } from 'react';
import '../assets/Stats.css';
import axios from "axios";
import StatsRow from './StatsRow';

const TOKEN = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {

  const [stockData, setstockData] = useState([])

  const getStockData = (stock) => {
    return axios
    .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
    .catch((error) => {
      console.log("Error", error.message);
    });
  };

  useEffect(()=>{
    let tempStockData = [];
    const stocksList = ["AALP", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStockData(stock)
        .then((result) => { //response/result that we get 
          console.log(result);
          tempStockData.push({
            name: stock,
            ...result.data // using the spread operator here to spread the result.data object
            // into the tempStockData list of objects 

          });
        })
      )
    });

    Promise.all(promises).then(()=>{
      setstockData(tempStockData);
      console.log(tempStockData);
    })
  }, [])

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {/* for our current stocks */}
          </div>
        </div>
        <div className="stats__header">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {/* stocks we can buy */}
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
