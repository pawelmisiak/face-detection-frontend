import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max : 35 , reverse: true }}
        style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3 dc">
          <img
            style={{paddingTop: '5px', height: 110, width: 110}}
            src={brain}
            alt='logo'/>
        </div>
      </Tilt>
    </div>
  );
}
// for div's and img in className I used tachyons styling for easier application

export default Logo;
