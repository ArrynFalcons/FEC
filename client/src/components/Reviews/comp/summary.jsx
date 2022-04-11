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

  useEffect(() => {
    Summary.averageRating = avg;
  }, [avg]);

  let cssProps = {};
  cssProps['--rating'] = avg;
  let foregroundstyle = { height: '10px', width: '100%', backgroundColor: '#F0F8FF' };
  let marginbottom = {'marginBottom': '20px'};
  return (
    <div className="summary" title="reviews">
      <h1>Ratings and Reviews</h1>
      <div>
        {total} Reviews
      </div>
      <div title="summary">
        Average Rating:
        {' '}
        {Math.round(10 * avg) / 10}
        /5
      </div>
      <div className="Stars" style={cssProps} ></div>
      <div>5 Stars: </div>
      <div className="background-bar">
        <div id="foreground5" className="foreground-bar" style={{ height: '30px', width: `${100 * count5 / total}%`, backgroundColor: 'black' }} />
      </div>
      <div>4 Stars: </div>
      <div className="background-bar">
        <div id="foreground4" className="foreground-bar" style={{ height: '30px', width: `${100 * count4 / total}%`, backgroundColor: 'black' }} />
      </div>
      <div>3 Stars: </div>
      <div className="background-bar">
        <div id="foreground3" className="foreground-bar" style={{ height: '30px', width: `${100 * count3 / total}%`, backgroundColor: 'black' }} />
      </div>
      <div>2 Stars: </div>
      <div className="background-bar">
        <div id="foreground2" className="foreground-bar" style={{ height: '30px', width: `${100 * count2 / total}%`, backgroundColor: 'black' }} />
      </div>
      <div >1 Star: </div>
      <div style={marginbottom} className="background-bar">
        <div id="foreground1" className="foreground-bar" style={{ height: '30px', width: `${100 * count1 / total}%`, backgroundColor: 'black' }} />
      </div>
      <br/>
      <div style={marginbottom}>Average Recommendation: {Math.round(recommend * 100 /total)}% said yes.</div>
      <div id="characteristics" style={marginbottom}>Characteristics

        <div style={marginbottom}>Size
          <div className="foreground-bar" style={foregroundstyle}>
            <div style={{position: 'absolute', left: `${size * 40}px` }}>▼</div>
          </div>
          <div>
            Too Small ------ Perfect ------ Too Large
          </div>
        </div>
        <div style={marginbottom}>Width
          <div className="foreground-bar" style={foregroundstyle}>
            <div style={{position: 'absolute', left: `${width * 40}px` }}>▼</div>
          </div>
          <div>
            Too Narrow --- Just Right ----- Too Wide
          </div>
        </div>
        <div style={marginbottom}>Comfort
          <div className="foreground-bar" style={foregroundstyle}>
            <div style={{position: 'absolute', left: `${comfort * 40}px` }}>▼</div>
          </div>
          <div>
            Low ---------- Average ------------ High
          </div>
        </div>
        <div style={marginbottom}>Quality
          <div className="foreground-bar" style={foregroundstyle}>
            <div style={{position: 'absolute', left: `${quality * 40}px` }}>▼</div>
          </div>
          <div>
            Poor --------- Average ----------- High
          </div>
        </div>

      </div>
    </div>
  );
}

export default Summary;
