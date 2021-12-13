import { useState, useEffect, useContext } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import AddTask from "../components/AddTask";
import { useParams } from "react-router";
import events from "../events.json";
import Map from "../components/Map";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import loader from  "../running-man.gif"
import { AuthContext } from "./../context/auth.context";



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
    axios
      .get(`${API_URI}/api/event/${sportId}`)
      .then((response) => {
        console.log('response.data', response.data);
        setSport(response.data);
         setIsLoading(false);

      })
      .catch(console.log);
  }, []);

  const { user } = useContext(AuthContext);
  console.log("user", user);
  



  // useEffect(() => {
  //   const filteredSport = events.filter((event) => event._id === sportId);
  //   setSport(filteredSport[0]);
  //   setIsLoading(false);
  // }, []);
  // console.log(sport);
console.log("sport", sport)
  return (
    <div className="SportDetails">
      {isLoading ? (
        <>
        <img src={loader} alt="loading..."  width="130" height="130"/>
          <p>Loading...</p>  
          </>    ) : (
        <>
          <h1>{sport.sport}</h1>
          <p>Location: {sport.location}</p>
          <p>Players: {sport.players}</p>
          <p>Time: {sport.time}</p>
          <p>Price: {sport.price}</p>
          <Map venue={{latitude: sport.venue.location.coordinates[0], longitude: sport.venue.location.coordinates[1]}}></Map>

          <Link to={`/`}>
            <button>Home</button>
          </Link>
          <Link to={`/confirmation`}>
            <button>Join game</button>
          </Link>
          
        </>
      )}
    </div>
  );
}

export default SportDetailsPage;
