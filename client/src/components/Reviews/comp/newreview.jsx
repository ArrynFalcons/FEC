/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewReview(props) {
  const { grd, pid } = props;
  const [reviewstate, setreviewstate] = useState(false);
  const [bodyparams, setbodyparams] = useState({});
  const [metadata, setmetadata] = useState({});
  const [newrating, setnewrating] = useState(0);
  const [yes, setYes] = useState('#A9A9A9');
  const [no, setNo] = useState('#A9A9A9');
  const [submit, setSubmit] = useState('#A9A9A9');
  const openReviewBox = () => {
    setreviewstate(true);
  };
  useEffect(() => {
    grd('reviews', '', '', '', pid, 'meta')
      .then((data) => {
        setmetadata(data.data);
        let bodyparamscopy = bodyparams;
        bodyparamscopy.product_id = Number(data.data.product_id);
        bodyparamscopy.characteristics = {
          220243: 4,
          220244: 3.5,
          220245: 4,
          220246: 3.5,
        };
        bodyparamscopy.rating = newrating;
        setbodyparams(bodyparamscopy);
      })
      .catch((err) => {
        console.log('Error retrieving reviews: ', err);
      });
      // cleanup task here
      return () => {
        setmetadata({});
      };
  }, [pid]);
  const ratingHelper = (rating) => {
    setnewrating(rating);
  };
  const switchColor = (button) => {
    if (button === 'Yes') {
      setYes('#4CAF50');
      setNo('#A9A9A9');
    } else if (button === 'No') {
      setYes('#A9A9A9');
      setNo('#4CAF50');
    } else {
      setSubmit('#4CAF50');
    };
  };
  useEffect(() => {
    let bodyparamscopy = bodyparams;
    bodyparamscopy.rating = newrating;
    setbodyparams(bodyparamscopy);
  }, [newrating]);
  /* Sample Post Body Parameters
  {
    "product_id": "65635",
    "rating": 5,
    "summary": "These shoes are great! They really up my court game!",
    "recommend": true,
    "name": "Zucc Berg",
    "email": "zuccberg@fb.com",
    "photos": ["https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F04%2F05%2Fsteph-curry-4-2000.jpg"],
    "characteristics": {
        "220243": 4,
        "220244": 3.5,
        "220245": 4,
        "220246": 3.5
    }
}
  Meta data for 65635
  {
    "product_id": "65635",
    "ratings": {
        "3": "1",
        "4": "1"
    },
    "recommended": {
        "true": "2"
    },
    "characteristics": {
        "Size": {
            "id": 220243,
            "value": "4.0000000000000000"
        },
        "Width": {
            "id": 220244,
            "value": "3.5000000000000000"
        },
        "Comfort": {
            "id": 220245,
            "value": "4.0000000000000000"
        },
        "Quality": {
            "id": 220246,
            "value": "3.5000000000000000"
        }
    }
  }
  */
 let cssProps = {};
 cssProps['--rating'] = newrating;
 cssProps['zIndex'] = '1';
 cssProps['position'] = 'absolute';
 cssProps['left'] = '0px';
 cssProps['top'] = '17px';
 let cssFloaters = { float:'left', width: '42px', 'zIndex': '2'};
 let cssFloaters1 = { float:'left', width: '45px', marginLeft: '15px', 'zIndex': '2'};
 let buttonStyleYes = {
  marginLeft: '5px',
  backgroundColor: yes, /* Green */
  border: 'none',
  color: 'white',
  padding: '5px 5px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'}
let buttonStyleNo = {
  marginLeft: '5px',
  backgroundColor: no, /* Green */
  border: 'none',
  color: 'white',
  padding: '5px 5px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'}
let buttonStyleSubmit = {
  marginLeft: '5px',
  backgroundColor: submit, /* Green */
  border: 'none',
  color: 'white',
  padding: '5px 5px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'}

  return (
    <div style={{left: '10px'}}>
      <h1>Leave a New Review</h1>
      <br />
      <input
        type="text"
        onChange={(e) => {
          setnewrating
          let bodyparamscopy = bodyparams;
          bodyparamscopy.name = `${e.target.value}`;
          setbodyparams(bodyparamscopy);
        }}
        placeholder="Name"
      />
      <input
        type="text"
        style={{marginLeft: '5px'}}
        onChange={(e) => {
          let bodyparamscopy = bodyparams;
          bodyparamscopy.email = `${e.target.value}`;
          setbodyparams(bodyparamscopy);
        }}
        placeholder="Email"
      />
      <div style={{width: '300px'}}>
        <div>Please rate out of 5 stars:</div>
        <div className="1star" style={cssFloaters1} onMouseOver={(e) => {
          ratingHelper(1);
        }}>1</div>
        <div className="2star" style={cssFloaters} onMouseOver={(e) => {
          ratingHelper(2);
        }}>2</div>
        <div className="3star" style={cssFloaters} onMouseOver={(e) => {
          ratingHelper(3);
        }}>3</div>
        <div className="4star" style={cssFloaters} onMouseOver={(e) => {
          ratingHelper(4);
        }}>4</div>
        <div className="5star" style={cssFloaters} onMouseOver={(e) => {
          ratingHelper(5);
        }}>5</div>
          <div className="Stars" style={cssProps} ></div>
      </div>
      <br/>
      <div style={{marginBottom: '5px'}}>
        Do you recommend this product?
        <button
          type="submit"
          style={buttonStyleYes}
          onClick={() => {
            switchColor('Yes');
            let bodyparamscopy = bodyparams;
            bodyparamscopy.recommend = true;
            setbodyparams(bodyparamscopy);
          }}
        >
          Yes
        </button>
        <button
          type="submit"
          style={buttonStyleNo}
          onClick={() => {
            switchColor('No');
            let bodyparamscopy = bodyparams;
            bodyparamscopy.recommend = false;
            setbodyparams(bodyparamscopy);
          }}
        >
          No
        </button>
      </div>
      <textarea
        rows="1"
        cols="80"
        onChange={(e) => {
          let bodyparamscopy = bodyparams;
          bodyparamscopy.summary = `${e.target.value}`;
          setbodyparams(bodyparamscopy);
        }}
        placeholder="Review Title"
      />
      <textarea
        rows="5"
        cols="80"
        onChange={(e) => {
          let bodyparamscopy = bodyparams;
          bodyparamscopy.body = `${e.target.value}`;
          setbodyparams(bodyparamscopy);
        }}
        placeholder="Write your review here"
      />
      <textarea
        rows="2"
        cols="80"
        onChange={(e) => {
          let bodyparamscopy = bodyparams;
          bodyparamscopy.photos = e.target.value.split(',');
          setbodyparams(bodyparamscopy);
        }}
        placeholder="Add comma separated URLs to include images"
      />
      <br/>
      <div style={{position: 'absolute', left: '620px'}}>
        <button
          type="submit"
          style={buttonStyleSubmit}
          onClick={() => {
            switchColor('submit');
            console.log('Body params are being sent to server!', bodyparams)
            axios.post('/reviews', bodyparams)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewReview;
