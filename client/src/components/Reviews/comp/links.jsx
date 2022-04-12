/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Links(props) {
  const [avg, setAvg] = useState(0);

  return (
    <div className='links' style={{display:'flex', justifyContent: 'center'}}>
      <div>Col1</div>
      <div>Col2</div>
      <div>Col3</div>
    </div>
  );
}

export default Links;
