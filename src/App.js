import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';
import LoginForm from './Components/LoginForm'
import PizzaPlaces from './Components/PizzaPlaces';

console.log(process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN);
console.log(process.env.NODE_ENV);

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
      pizza_place_list: [],
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.getPizzaPlacesFromHereAPI = this.getPizzaPlacesFromHereAPI.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
  }

  componentDidMount(){
    //get location from browser
    this.setCurrentLocation();
  } 

  getPizzaPlacesFromHereAPI(){
    
    const here_api_url      = "https://places.cit.api.here.com/places/v1/autosuggest?";
    const here_api_at       = `at=${this.state.lat},${this.state.lng}&`;
    const here_api_q        = "q=pizza&";
    const here_api_app_id   = `app_id=${process.env.REACT_APP_HERE_API_APP_ID}&`;
    const here_api_app_code = `app_code=${process.env.REACT_APP_HERE_API_APP_CODE}`;

    //the built-in fetch API will make the REST/AJAX call for us: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch    
    fetch(here_api_url + here_api_at + here_api_q + here_api_app_id + here_api_app_code)
      .then( (response) => {
          //call HERE API and get returned list
          return response.json();
        }
      )
      //filter down to response that have locations (lat/lon)
      .then( (responseAsJson) => {

        //use the JavaScript filter method - https://www.w3schools.com/jsref/jsref_filter.asp
        const filtered = responseAsJson.results.filter( (result) => {
          //this checks to see if this record has a position array
          return result.position;

        });

        //return the filtered results
        return filtered;
        
      })
      //receive the promise response returned as a JSON object
      .then( (filtered) => {

          this.setState( () => {
            return {
              pizza_place_list: filtered,
            }
          }
        );

        return filtered;
      })
      .then( (filtered) => {

        this.state.pizza_place_list.forEach( (pizza_place) => {
            const pizzalocation = pizza_place.title + ' ' +
                                  pizza_place.vicinity + ' ' +
                                  pizza_place.category;

            console.log(pizzalocation);
          }
        );
        console.log(this.state.pizza_place_list[2].title);
      })
      .catch(error => console.error(error));
  }

  handleFormSubmission(formdata){}

  setCurrentLocation(){
    //check to see if we can get the browser's geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        //set state properties for lat and long
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

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const { lng, lat, mapstyle} = this.state;

    return (
      <div className="App-header">
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
          <PizzaPlaces places={this.state.pizza_place_list} />
        </div>
      </div>
    );
  }
}

export default App;