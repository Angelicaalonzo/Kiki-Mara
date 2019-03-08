import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';
import LoginForm from './Components/LoginForm'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYWh1aW1hbnU2OSIsImEiOiJjanNpYnZnNG0wbTB6NDlxb3VqbzQ0ZjRpIn0.a4bjWgujDq3W3RxGVeuwVw',
}); 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: -98.5795,
      lat: 39.828175,
      zoom: 2,
      mapstyle: "basic",
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  componentDidMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.setState( () => {
            return {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
        );
      });
    }else{
      console.log("Geolocation is not supported by this browser.");
    }
  }

  handleFormSubmission(formdata){}

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { lng, lat, mapstyle} = this.state;

    return (
      <div className="container">
        <LoginForm onFormSubmit={this.handleFormSubmission}/>
        <Map style={`mapbox://styles/mapbox/${mapstyle}-v9`}
          center={[lng, lat]} 
          containerStyle={{ height: "400px", width: "100%" }}>
          <Layer type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15"}}>
            <Feature coordinates={[lng, lat]}/>
          </Layer>
        </Map>
        <div>
        {/* FIXME: SHOW RESULTS FROM FORM HERE */}
          
        </div>
      </div>
    );
  }
}

export default App;