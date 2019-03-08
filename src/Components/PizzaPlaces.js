import React from 'react';
import PizzaPlace from './PizzaPlace';

var PizzaPlaces = (props) => {

    const places = props.places;

    return (
        <div className="card-columns">
            {places.map( (place) => 
                <PizzaPlace key={place.id} 
                            placedata={place} />
            )}
        </div>
    );
}

export default PizzaPlaces;