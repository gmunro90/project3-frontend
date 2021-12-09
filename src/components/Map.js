import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const REACT_APP_MAPBOX_TOKEN = `pk.eyJ1IjoiY29saW5jaGFkd2ljayIsImEiOiJja3d6MjltODMwMmowMnJxbDE4Z3hzcGluIn0.iF3HrtD4LzaIc0yr41oU0A`;

export default function Map(props) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 41.3808,
    longitude: 2.1228,
    zoom: 13,
  });

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
          key={"gfdsyeahsdu"}
          latitude={props.venue.latitude}
          longitude={props.venue.longitude}
        >
          <img src="../pin.png" alt="pin" width="30" height="25" />
        </Marker>
      </ReactMapGL>
    </>
  );
}
