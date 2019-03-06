import React, { Component } from 'react';
import logo from './logo.svg';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'; 
import './App.css';
import Email from './Components/Email';

const EmailInput = (props) => {
  const onEmailChange = (event) => {
    var email = event.target.value;

    this.props.onEmailChange(email);
  }
}

class App extends Component {
  render() {
    return (
      
     <div className ="app">
     <header className = "App-header">
     </header>
      
     {/* <Email onEmailChange={this.onEmailChange}/> */}ç
     </div>
  
    );
  }
}

export default App;
