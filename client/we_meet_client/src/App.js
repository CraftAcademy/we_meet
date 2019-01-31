import React, { Component } from 'react';
import Events from './components/Events/Events'
import SignUpForm from './components/Registration/signUpForm'

class App extends Component {
  render() {
    return (
      <div>
        <h1>WeMeet</h1>
        <Events />
        <SignUpForm />
      </div>
    );
  }
}

export default App;
