import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
  return (
    <div>
      <p className='f3'>{/* tachyon styling */}
        {'Insert A picture and I will find a face in it.'}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 form center'>{/* tachyon styling */}
          <input className='f4 pa2 w-70 center' type='text'/> {/* tachyon styling */}
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-gold'>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm
