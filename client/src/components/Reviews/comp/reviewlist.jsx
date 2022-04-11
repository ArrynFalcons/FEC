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
  console.log('p', pid)
  const markAsHelpful = (id) => {
    axios.post('/helpfulreview', { id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const reportReview = (id) => {
    axios.post('/reportreview', { id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
  const pagination = (page, amount, sorter) => {
    var total = amount || 5;
    var sort = sorter || '';
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
  let liststyle = {'list-style': 'none', width: '800px'};
  let sortstyle1 = {position: 'absolute', left: '700px'};
  let sortstyle2 = {position: 'absolute', left: '630px'};
  let floatstyle = {float: 'left'};
  let absoluteleft = {position: 'absolute', left: '100px'};
  let bigfont = {'font-size': '20px'};
  return (
    <div className="review-list">
      <div style={sortstyle2}>Sort By:</div>
      <label>.</label>
      <select style={sortstyle1} id="reviewlist" onChange={(e) => {pagination(1, 1000, `${e.target.value}`)}}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>

      <ul style={liststyle}>
        {reviews.map((review) => {
          let cssProps = {};
          cssProps['--rating'] = review.rating;
          cssProps.position = 'absolute';
          cssProps.left = '500px';
          return (
            <li className="tile" key={`${review.review_id}`}>
              <div className="margin10">
                <div className="Stars" style={cssProps}></div>
                <div style={bigfont}>
                  {` "${review.summary}" `}
                </div>
                <div>
                  Name:
                  {` ${review.reviewer_name} `}
                </div>
                <div>
                  Reviewed on:
                  {' '}
                  {moment(review.date).format('MMMM Do YYYY')}
                </div>
                <br/>
                <div style={bigfont} className="reviewbody">
                  {`"${review.body}"`}
                </div>
                {/* <style dangerouslySetInnerHTML={{_html: `.reviewbody {color:blue}`}}/> */}
                <div className="inline-block">
                  {review.photos.map((photo) => (
                    <img
                      src={`${photo.url}`}
                      value={photo.url}
                      style={{ display: 'inline-block' }}
                      className="zoom"
                      // onMouseOver={(e) => console.log(e.target.currentSrc)}
                    // onMouseOut={e=>console.log(e.target.currentSrc)}
                      alt="reviewimages"
                      height="200"
                    />
                  ))}
                </div>
                <div style={{ color: 'blue' }}>
                  Recommend?
                  {review.recommend ? ' Yes' : ' No'}
                </div>
                <div>
                  {review.helpfulness}
                  people found this review helpful. Did you it helpful?
                </div>
                <div>
                  <button
                    type="submit"
                    value={`${review.review_id}`}
                    onClick={(e) => {
                      markAsHelpful(e.target.value);
                    }}
                  >
                    Yes

                  </button>
                  <button
                    type="submit"
                    value={`${review.reviewer_name}`}
                    onClick={(e) => {
                      setReport(true);
                      setActiveKey(e.target.value);
                    }}
                  >
                    No
                  </button>
                </div>
                {report && activekey === review.reviewer_name
                  ? (
                    <>
                      <textarea
                        rows="4"
                        cols="50"
                        placeholder="If you wish to report this review, please use this form and submit your feedback. Thank you for keeping this site safe for all users"
                      />
                      <button type="submit" value={`${review.review_id}`} onClick={(e) => { reportReview(e.target.value); }}>Submit</button>
                    </>
                  ) : null}
              </div>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={() => { pagination(1); }}>1</button>
        <button onClick={() => { pagination(2); }}>2</button>
        <button onClick={() => { pagination(3); }}>3</button>
        <button onClick={() => { pagination(4); }}>4</button>
        <button onClick={() => { pagination(5); }}>5</button>
      </div>
    </div>
  );
}

export default ReviewList;
