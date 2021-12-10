import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import loader from  "../running-man.gif"

export default function Venues() {
  const [venueList, setVenueList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const API_URI = process.env.REACT_APP_API_URI;

  useEffect(() => {
    axios
      .get(`${API_URI}/api/venue`)
      .then((response) => {
        console.log("response.data.venues", response.data);
        setVenueList(response.data);
         setIsLoading(false)
        console.log("venues", venueList);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>Venues</h2>
      {isLoading ? (
          <>
          <img src={loader} alt="loading..."  width="130" height="130"/>
          <p>Loading...</p>
          </>
      ) : (
          <>
      {venueList.map((venue) => {
        return (
          <>
            <h3>Name: {venue.name}</h3>
            <p>Location: {venue.location.type}</p>
            <p>Description: {venue.description}</p>
            <Map venue={{latitude: venue.location.coordinates[0], longitude: venue.location.coordinates[1]}}></Map>
            </>
          
          )}
          
        )
      }
      </>)}
    </div>
  )
}
