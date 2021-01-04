import React, { useEffect, useState } from 'react';
import '../assets/Stats.css';
import axios from "axios";

const TOKEN = process.env.REACT_APP_API_KEY;
console.log(TOKEN);
const BASE_URL = "https://finnhub.io/api/v1/quote"

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
    let tempStocksData = [];
    const stocksList = ["AALP", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStockData(stock)
        .then((res) => { //response/result that we get 
          console.log(res)
          // tempStocksData.push({
          //   name: stock,
          //   ...res.data
          // });
        })
      )
    });

    // Promise.all(promises).then(()=>{
    //   console.log(testData);
    //   setstockData(testData)
    // })
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
