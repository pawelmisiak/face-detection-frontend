import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>{/* tachyon styling */}
        {'Insert A picture and I will find a face in it.'}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 form center'>{/* tachyon styling */}
          <input
            className='f4 pa2 w-70 center'// {/* tachyon styling */}
            type='text'
            onChange={onInputChange}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-gold'
            onClick={onButtonSubmit}
            >Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm
