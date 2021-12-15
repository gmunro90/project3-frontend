import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";

//import "mapbox-gl/dist/mapbox-gl.css";

const REACT_APP_MAPBOX_TOKEN = `pk.eyJ1IjoiY29saW5jaGFkd2ljayIsImEiOiJja3d6MjltODMwMmowMnJxbDE4Z3hzcGluIn0.iF3HrtD4LzaIc0yr41oU0A`;

export default function MultipleMap(props) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 41.3874,
    longitude: 2.1686,
    zoom: 11,
  });
  const [selectedVenue, setselectedVenue] = useState(null);

  console.log("events", props.events[0].length)


  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/colinchadwick/ckwz5aj220xt914o3r0g87fbo"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {props.events[0].map((event) => {
            console.log("consoled event", event)
            return (

          <Marker
            key={event._id}
            latitude={event.venue.location.coordinates[0]}
            longitude={event.venue.location.coordinates[1]}
            offsetTop={-15}
            offsetLeft={-15}

          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setselectedVenue(event);

                console.log("selected", selectedVenue);
              }}
            >
              <img src="../pin.png" alt="pin" width="30" height="25" />
            </button>
          </Marker>
        )})}
        {selectedVenue ? (
          <Popup
            latitude={selectedVenue.venue.location.coordinates[0]}
            longitude={selectedVenue.venue.location.coordinates[1]}
            onClose={() => {
              setselectedVenue(null);
            }}
          >
            <div>
            <div>
            <img className="popup-img"src={selectedVenue.venue.image} alt=""/>
              <h2>{selectedVenue.venue.name}</h2>
              <p>{selectedVenue.venue.location.type}</p>
              <p>{selectedVenue.date}</p>
              <p>{selectedVenue.time}</p>
<Link to={`sports/${selectedVenue._id}`}>more info</Link>

            </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
}
