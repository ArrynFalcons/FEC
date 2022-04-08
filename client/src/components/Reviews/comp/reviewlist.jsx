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
  const { grd } = props;
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
    grd('reviews', page, total, sort, '65635', '') // (route, page, count, sort, Id, endParam)
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
  return (
    <div className="review-list">
      <label> Sort by:</label>
      <select id="reviewlist" onChange={(e) => {pagination(1, 1000, `${e.target.value}`)}}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>

      <ul>
        {reviews.map((review) => {
          let cssProps = {};
          cssProps['--rating'] = review.rating;
          return (
            <li key={`${review.review_id}`}>
              <div className="tile">
                <div className="Stars" style={cssProps} ></div>
                <div>
                  Rating:
                  {' '}
                  {review.rating}
                </div>
                <div>
                  Title:
                  {' '}
                  {review.summary}
                </div>
                <div>
                  Name:
                  {' '}
                  {review.reviewer_name}
                </div>
                <div>
                  Reviewed on:
                  {' '}
                  {moment(review.date).format('MMMM Do YYYY')}
                </div>
                <div className="reviewbody">
                  {review.body}
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
                      width="200"
                    />
                  ))}
                </div>
                <div style={{ color: 'blue' }}>
                  Recommend?
                  {review.recommend ? ' Yes' : ' No'}
                </div>
                <div>
                  {review.helpfulness}
                  people found this review helpful.
                </div>
                <div>
                  Did you find this review helpful?
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
