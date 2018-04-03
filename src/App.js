import React, { Component } from 'react';
import SignIn from './components/signin/SignIn';
import Navigation from './components/navigation/Navigation';
import Register from './components/register/Register';
import Clarifai from 'clarifai';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
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
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width); //Number makes sure that the data is numeric
    const height = Number(image.height);
    return {
      //leftCol is a procentage and by multip but width we will get the
      //length of the column that we are looking for
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //to retrive the exact input from keyboard
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); // assigning passed url from input

    // below clarifai provided us an API that takes url
    // under Clarifai.COLOR_MODEL was changed from GENERAL_MODEL to COLOR_MODEL
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      // .then(response => this.calculateFaceLocation(response)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              // this.setState({user: { //this would update the entire user
              //   entries: count
              // }})
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <Particles params={particlesOptions} className='particles'/>
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange} />
        {
          this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}/> {/* passing input as prop */}
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : (
              this.state.route === 'signin'
              ? <SignIn
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}
                />
              : <Register
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}
                />
            )
        }
      </div>
    );
  }
}

export default App;
