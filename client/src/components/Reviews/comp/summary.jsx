/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Summary(props) {
  const [avg, setAvg] = useState(0);
  const [total, setTotal] = useState(0);
  const [count5, set5count] = useState(0);
  const [count4, set4count] = useState(0);
  const [count3, set3count] = useState(0);
  const [count2, set2count] = useState(0);
  const [count1, set1count] = useState(0);
  const { grd } = props;

  useEffect(() => {
    grd('reviews', '', '', '', '65635', '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        let [sum, total, one, two, three, four, five] = [0, 0, 0, 0, 0, 0, 0];
        // console.log('Summary data retrieved: ', data.data.results);
        data.data.results.forEach((obj) => {
          switch (obj.rating) {
            case 5: five += 1;
              break;
            case 4: four += 1;
              break;
            case 3: three += 1;
              break;
            case 2: two += 1;
              break;
            case 1: one += 1;
              break;
            default: console.log('Default triggered');
          }
          total += 1;
          sum += obj.rating;
        });
        setAvg(sum / total);
        setTotal(total);
        set5count(five);
        set4count(four);
        set3count(three);
        set2count(two);
        set1count(one);
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err);
      });
  }, []);
  return (
    <div className="summary">
      Ratings and Reviews
      <div>
        Average Rating:
        {' '}
        {Math.round(10 * avg) / 10}
        /5
      </div>
      <div>5 Stars: </div>
      <div className="background-bar">
        <div id="foreground5" className="foreground-bar" style={{ height: '30px', width: `${100 * count5 / total}%`, backgroundColor: 'blue' }} />
      </div>
      <div>4 Stars: </div>
      <div className="background-bar">
        <div id="foreground4" className="foreground-bar" style={{ height: '30px', width: `${100 * count4 / total}%`, backgroundColor: 'blue' }} />
      </div>
      <div>3 Stars: </div>
      <div className="background-bar">
        <div id="foreground3" className="foreground-bar" style={{ height: '30px', width: `${100 * count3 / total}%`, backgroundColor: 'blue' }} />
      </div>
      <div>2 Stars: </div>
      <div className="background-bar">
        <div id="foreground2" className="foreground-bar" style={{ height: '30px', width: `${100 * count2 / total}%`, backgroundColor: 'blue' }} />
      </div>
      <div>1: </div>
      <div className="background-bar">
        <div id="foreground1" className="foreground-bar" style={{ height: '30px', width: `${100 * count1 / total}%`, backgroundColor: 'blue' }} />
      </div>
    </div>
  );
}

export default Summary;
