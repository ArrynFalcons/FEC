/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

moment().format();

function ReviewList(props) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [report, setReport] = useState(false);
  const [activekey, setActiveKey] = useState('');
  const { grd, pid } = props;
  const markAsHelpful = (id) => {
    axios.post('/helpfulreview', { id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setReportF = () => {
    if (report) {
      setReport(false);
    } else {
      setReport(true);
    }
  }
  const reportReview = (id) => {
    axios.post('/reportreview', { id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
  const pagination = (page, amount, sorter) => {
    const total = amount || 5;
    const sort = sorter || '';
    grd('reviews', page, total, sort, pid, '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        setReviews(data.data.results);
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err);
      });
  };
  useEffect(() => {
    pagination(1);
  }, []);
  useEffect(() => {
    grd('reviews', 1, 5, '', pid, '') // (route, page, count, sort, Id, endParam)
      .then((data) => {
        setReviews(data.data.results);
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err);
      });
  }, [pid]);
  const liststyle = { listStyle: 'none', width: '800px' };
  const sortstyle1 = { position: 'absolute', left: '700px' };
  const sortstyle2 = { position: 'absolute', left: '630px' };
  const floatstyle = { float: 'left' };
  const absoluteleft = { position: 'absolute', left: '100px' };
  const bigfont = { fontSize: '20px' };
  const buttonStyle = {
    marginLeft: '5px',
    marginBottom: '5px',
    backgroundColor: '#A9A9A9', /* Green */
    border: 'none',
    color: 'white',
    padding: '3px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  };
  const buttonStyleFloat = {
    float: 'left',
    marginLeft: '5px',
    marginBottom: '5px',
    backgroundColor: '#A9A9A9', /* Green */
    border: 'none',
    color: 'white',
    padding: '3px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  };
  const buttonStyleRight = {
    marginLeft: '10px',
    marginBottom: '5px',
    backgroundColor: '#A9A9A9', /* Green */
    border: 'none',
    color: 'white',
    padding: '3px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  };
  const buttonStyleR = {
    marginLeft: '550px',
    marginBottom: '5px',
    backgroundColor: '#A9A9A9', /* Green */
    border: 'none',
    color: 'white',
    padding: '3px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
  };
  return (
    <div className="review-list" title="reviewlist">
      <div style={sortstyle2}>Sort By:</div>
      <label>.</label>
      <select style={sortstyle1} id="reviewlist" onChange={(e) => { pagination(1, 1000, `${e.target.value}`); }}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>

      <ul style={liststyle}>
        {reviews.map((review) => {
          const cssProps = {};
          cssProps['--rating'] = review.rating;
          cssProps.position = 'absolute';
          cssProps.left = '550px';
          return (
            <li className="tile" key={`${review.review_id}`}>
              <div className="margin10">
                <div className="Stars" style={cssProps} />
                <div>
                  {` ${review.reviewer_name} `}
                </div>
                {/* <div>
                  {' '}
                  {moment(review.date).format('MMMM Do YYYY')}
                </div> */}
                <div style={bigfont}>
                  <strong>{` "${review.summary}" `}</strong>
                </div>
                <div className="reviewbody">
                  {`"${review.body}"`}
                </div>
                {/* <style dangerouslySetInnerHTML={{_html: `.reviewbody {color:blue}`}}/> */}
                <div className="inline-block">
                  {review.photos.map((photo) => (
                    <img
                      src={`${photo.url}`}
                      key={`${photo.url}`}
                      value={photo.url}
                      style={{ zIndex: '5', display: 'inline-block', border: '1px solid', marginLeft: '10px' }}
                      className="zoom"
                      // onMouseOver={(e) => console.log(e.target.currentSrc)}
                    // onMouseOut={e=>console.log(e.target.currentSrc)}
                      alt="reviewimages"
                      height="100"
                      width="100"
                    />
                  ))}
                </div>
                {review.recommend ?
                <div style={{float:'left'}}>Recommend: Yes.
                </div>
                : null}
                <div style={{float:'left'}}>
                  {`${review.helpfulness} `}
                  ⬆ Helpful?
                </div>
                <div>
                  <button
                    type="submit"
                    style={buttonStyleFloat}
                    value={`${review.review_id}`}
                    onClick={(e) => {
                      markAsHelpful(e.target.value);
                    }}
                  >
                    Yes

                  </button>
                  <button
                    type="submit"
                    style={buttonStyleRight}
                    value={`${review.reviewer_name}`}
                    onClick={(e) => {
                      setReportF();
                      setActiveKey(e.target.value);
                    }}
                  >
                    Report
                  </button>
                </div>
                {report && activekey === review.reviewer_name
                  ? (
                    <>
                      <textarea
                        rows="4"
                        cols="50"
                        style={{left: '150px'}}
                        placeholder="If you wish to report this review, please use this form and submit your feedback."
                      />
                      <br/>
                      <button type="submit" style={buttonStyleR} value={`${review.review_id}`} onClick={(e) => { reportReview(e.target.value); }}>Submit</button>
                    </>
                  ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <button style={buttonStyle} onClick={() => { pagination(1); }}>1</button>
        <button style={buttonStyle} onClick={() => { pagination(2); }}>2</button>
        <button style={buttonStyle} onClick={() => { pagination(3); }}>3</button>
        <button style={buttonStyle} onClick={() => { pagination(4); }}>4</button>
        <button style={buttonStyle} onClick={() => { pagination(5); }}>5</button>
      </div>
    </div>
  );
}

export default ReviewList;
