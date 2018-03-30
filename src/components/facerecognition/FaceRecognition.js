import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center'>
      <img alt='' src={imageUrl} width='50%' height='50%' />
    </div>
  );
}

export default FaceRecognition;
