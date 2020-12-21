import React from 'react'
import '../assets/Newsfeed.css'
import LineGraph from './LineGraph'

function Newsfeed() {
  return (
    <div className="newsfeed">
      <div className="newsfeed__container">
        <div className="newsfeed__chartSection">
          <div className="newsfeed__portfolio">
            <h1>$114,656.84</h1>
            <p>+$44.63 (+0.04%) Today</p>
          </div>
          <div className="newsfeed__chart">
            <LineGraph />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsfeed
