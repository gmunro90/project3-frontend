import { useState, useEffect } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import AddTask from "../components/AddTask";
import { useParams } from "react-router";
import events from "../events.json";

import TaskCard from "../components/TaskCard";

const API_URI = process.env.REACT_APP_API_URI;

function SportDetailsPage(props) {
  const [sport, setSport] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id: sportId } = useParams();

  // const getProject = () => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers

  useEffect(() => {
    const filteredSport = events.filter((event) => event._id === sportId);
    setSport(filteredSport[0]);
    setIsLoading(false);
  }, []);
  console.log(sport);

  return (
    <div className="SportDetails">
      {isLoading ? (
        <p> Data is loading </p>
      ) : (
        <>
          <h1>{sportId}</h1>
          <p>{sport.sport}</p>
          <p>Location: {sport.location}</p>
          <p>Players: {sport.players}</p>
          <p>Time: {sport.time}</p>
          <p>Price: {sport.price}</p>

          <Link to={`/`}>
            <button>Home</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default SportDetailsPage;
