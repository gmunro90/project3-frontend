import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import uuid from "uuid";

//import "mapbox-gl/dist/mapbox-gl.css";

const REACT_APP_MAPBOX_TOKEN = `pk.eyJ1IjoiY29saW5jaGFkd2ljayIsImEiOiJja3d6MjltODMwMmowMnJxbDE4Z3hzcGluIn0.iF3HrtD4LzaIc0yr41oU0A`;

export default function Map(props) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: props.venue.latitude,
    longitude: props.venue.longitude,
    zoom: 13,
  });
  const [selectedVenue, setselectedVenue] = useState(null);

  function makeId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

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
          key={makeId()}
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
          >
            <div>
              <p>{props.venue.name}</p>

              <p>{props.venue.address}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
}
