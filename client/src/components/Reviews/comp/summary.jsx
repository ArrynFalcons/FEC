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
  const [recommend, setrecommend] = useState(0);
  const [width, setwidth] = useState('');
  const [comfort, setcomfort] = useState('');
  const [quality, setquality] = useState('');
  const [size, setsize] = useState('');
  const { grd } = props;

  useEffect(() => {
    grd('reviews', '', '3000', '', '65635', '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        let [sum, total, one, two, three, four, five, recommend] = [0, 0, 0, 0, 0, 0, 0, 0];
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
          if (obj.recommend === true) {
            recommend += 1;
          }
        });
        setAvg(sum / total);
        setTotal(total);
        set5count(five);
        set4count(four);
        set3count(three);
        set2count(two);
        set1count(one);
        setrecommend(recommend);
        grd('reviews', '', '', '', '65635', 'meta')
          .then((data) => {
            setwidth(data.data.characteristics.Width.value);
            setsize(data.data.characteristics.Size.value);
            setcomfort(data.data.characteristics.Comfort.value);
            setquality(data.data.characteristics.Quality.value);
          })
          .catch((err) => {
            console.log('Error retrieving reviews: ', err);
          });
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err);
      });
  }, []);
  return (
    <div className="summary" title="reviews">
      Ratings and Reviews
      <div title="summary">
        Average Rating:
        {' '}
        {Math.round(10 * avg) / 10}
        /5
      </div>
      <div>
        {total} people left a review.
      </div>
      <div>5 Stars: </div>
      <div className="background-bar">
        <div id="foreground5" className="foreground-bar" style={{ height: '30px', width: `${100 * count5 / total}%`, backgroundColor: '#90EE90' }} />
      </div>
      <div>4 Stars: </div>
      <div className="background-bar">
        <div id="foreground4" className="foreground-bar" style={{ height: '30px', width: `${100 * count4 / total}%`, backgroundColor: '#90EE90' }} />
      </div>
      <div>3 Stars: </div>
      <div className="background-bar">
        <div id="foreground3" className="foreground-bar" style={{ height: '30px', width: `${100 * count3 / total}%`, backgroundColor: '#90EE90' }} />
      </div>
      <div>2 Stars: </div>
      <div className="background-bar">
        <div id="foreground2" className="foreground-bar" style={{ height: '30px', width: `${100 * count2 / total}%`, backgroundColor: '#90EE90' }} />
      </div>
      <div>1 Star: </div>
      <div className="background-bar">
        <div id="foreground1" className="foreground-bar" style={{ height: '30px', width: `${100 * count1 / total}%`, backgroundColor: '#90EE90' }} />
      </div>
      <div>Average Recommendation: {Math.round(recommend * 100 /total)}% said yes.</div>
      <div id="characteristics">Characteristics Summary as reported by users.

        <div>Size
          <div className="foreground-bar" style={{ height: '20px', width: '200px', backgroundColor: '#F0F8FF' }}>
            <div style={{position: 'absolute', left: `${size * 40}px` }}>▼</div>
          </div>
          <div>
            1: Too Small - 5: Too Large
          </div>
        </div>
        <div>Width
          <div className="foreground-bar" style={{ height: '20px', width: '200px', backgroundColor: '#F0F8FF' }}>
            <div style={{position: 'absolute', left: `${width * 40}px` }}>▼</div>
          </div>
          <div>
            1: Too Narrow - 5: Too Wide
          </div>
        </div>
        <div>Comfort
          <div className="foreground-bar" style={{ height: '20px', width: '200px', backgroundColor: '#F0F8FF' }}>
            <div style={{position: 'absolute', left: `${comfort * 40}px` }}>▼</div>
          </div>
          <div>
            1: Low - 5: Extreme
          </div>
        </div>
        <div>Quality
          <div className="foreground-bar" style={{ height: '20px', width: '200px', backgroundColor: '#F0F8FF' }}>
            <div style={{position: 'absolute', left: `${quality * 40}px` }}>▼</div>
          </div>
          <div>
            1: Poor - 5: Outstanding
          </div>
        </div>

      </div>
    </div>
  );
}

export default Summary;
