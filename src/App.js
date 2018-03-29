import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'e2696ffcd20943df814e1fb1a75c4e35'
});

const particlesOptions = { //options for the dynamic bg
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }}
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value); //to retrive the exact input from keyboard
  };

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict(Clarifai.GENERAL_MODEL, "https://samples.clarifai.com/metro-north.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles params={particlesOptions} className='particles'/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        /> {/* passing input as prop */}
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
