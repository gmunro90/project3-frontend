import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

//import "mapbox-gl/dist/mapbox-gl.css";

const REACT_APP_MAPBOX_TOKEN = `pk.eyJ1IjoiY29saW5jaGFkd2ljayIsImEiOiJja3d6MjltODMwMmowMnJxbDE4Z3hzcGluIn0.iF3HrtD4LzaIc0yr41oU0A`;

export default function Map(props) {
  const [viewport, setViewport] = useState({
    width: 600,
    height: 350,
    latitude: props.venue.latitude,
    longitude: props.venue.longitude,
    zoom: 15,
  });
  const [selectedVenue, setselectedVenue] = useState(null);

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
        <Marker
          key={props.id}
          latitude={props.venue.latitude}
          longitude={props.venue.longitude}
        >
          <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              setselectedVenue(props.venue);
              console.log(selectedVenue);
            }}
          >
            <img src="../pin.png" alt="pin" width="30" height="25" />
          </button>
        </Marker>
        {selectedVenue ? (
          <Popup
            latitude={props.venue.latitude}
            longitude={props.venue.longitude}
            onClose={() => {
              setselectedVenue(null);
            }}
          >
            <div>
              <img className="popup-img" src={props.venue.image} alt="venue" />
              <h2>{props.venue.name}</h2>
              <p>{props.venue.address}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
}
