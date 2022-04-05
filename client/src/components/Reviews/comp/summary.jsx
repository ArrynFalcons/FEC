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
    grd('reviews/meta', '', '1000', '', '65651', '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        console.log('Metadata retrieved: ', data.data.results)
        var [sum, total, one, two, three, four, five] = [0, 0, 0, 0, 0, 0, 0];
        data.data.results.forEach(function(obj) {
          switch (obj.rating) {
            case 5: five++;
            break;
            case 4: four++;
            break;
            case 3: three++;
            break;
            case 2: two++;
            break;
            case 1: one++;
          }
          total++;
          sum += obj.rating
        })
        console.log('avg', sum/34)
        setAvg(sum/total)
        setTotal(total)
        set5count(five)
        set4count(four)
        set3count(three)
        set2count(two)
        set1count(one)
        console.log(one)
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err)
      });
  }, []);
  return (
    <div className="summary">
      Summary
      <div>
        Average Rating: {Math.round(10 * avg)/10}/5
      </div>
      <div>5: </div>
      <div className="background-bar">
        <div id='foreground5' className="foreground-bar" style={{height: '30px', width:`${100 * count5/total}%`, 'backgroundColor': 'blue'}}>
        </div>
      </div>
      <div>4: </div>
      <div className="background-bar">
        <div id='foreground4' className="foreground-bar" style={{height: '30px', width:`${100 * count4/total}%`, 'backgroundColor': 'blue'}}>
        </div>
      </div>
      <div>3: </div>
      <div className="background-bar">
        <div id='foreground3' className="foreground-bar" style={{height: '30px', width:`${100 * count3/total}%`, 'background-color': 'blue'}}>
        </div>
      </div>
      <div>2: </div>
      <div className="background-bar">
        <div id='foreground2' className="foreground-bar" style={{height: '30px', width:`${100 * count2/total}%`, 'background-color': 'blue'}}>
        </div>
      </div>
      <div>1: </div>
      <div className="background-bar">
        <div id='foreground1' className="foreground-bar" style={{height: '30px', width:`${100 * count1/total}%`, 'background-color': 'blue'}}>
        </div>
      </div>
    </div>
  );
}

export default Summary;