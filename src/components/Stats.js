import React, { useEffect, useState } from 'react';
import '../assets/Stats.css';
import axios from "axios";
import StatsRow from './StatsRow';
import { db } from "../firebase";


const TOKEN = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {

  const [stockData, setstockData] = useState([]);
  const [myStocks, setmyStocks] = useState([]);

  const getMyStocks = () => {
    db 
    .collection('myStocks')
    .onSnapshot(snapshot => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        promises.push(getStockData(doc.data().ticker)
        .then(result => {
          tempData.push({
            id: doc.id,
            data: doc.data(),
            info: result.data
          })
        })
      )})
      Promise.all(promises).then(()=> {
        setmyStocks(tempData);
      })
    })
  };

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
    getMyStocks();
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
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__lists">
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
