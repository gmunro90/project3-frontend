import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Map from "../components/Map";
import axios from "axios";
import loader from "../running-man.gif";
import { AuthContext } from "./../context/auth.context";
import Confirmation from "../components/Confirmation";

const API_URI = process.env.REACT_APP_API_URI;

function SportDetailsPage(props) {
  const [sport, setSport] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id: sportId } = useParams();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("")
  const [Joined, setJoined] = useState(false)

  // const getProject = () => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  useEffect(() => {
    axios
      .get(`${API_URI}/api/event/${sportId}`)
      .then((response) => {
        console.log("response.data", response.data);
        setSport(response.data);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  console.log("user", user);

  function handleSubmit() {
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URI}/api/join/${sportId}/${user._id}`,
        { user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((response) => {
        console.log("message", response.data);
        setMessage(response.data)
        setJoined(true)
      })
      .catch(console.log);
  }

  // useEffect(() => {
  //   const filteredSport = events.filter((event) => event._id === sportId);
  //   setSport(filteredSport[0]);
  //   setIsLoading(false);
  // }, []);
  // console.log(sport);
  console.log("sport", sport);
  return (
    <div className="SportDetails">
      {isLoading ? (
        <>
          <img src={loader} alt="loading..." width="130" height="130" />
          <p>Loading...</p>
        </>
      ) : (
        <>
          <h1>{sport.sport}</h1>
          <p>Location: {sport.venue.location.type}</p>
          <p>
            Players: {sport.players.length}/{sport.numberOfPlayers}
          </p>
          <p>Players: {sport.players.map((player) => player.name)}</p>
          <p>Time: {sport.time}</p>
          <p>Price: {sport.price}</p>
          <Map
            venue={{
              latitude: sport.venue.location.coordinates[0],
              longitude: sport.venue.location.coordinates[1],
            }}
          ></Map>

          <Link to={`/`}>
            <button>Home</button>
          </Link>
          {message === "" ? (
            <button onClick={handleSubmit}>Join game</button>

          ) : (

          <Confirmation message={[message]}></Confirmation>

          )}
          
        </>
      )}
    </div>
  );
}

export default SportDetailsPage;
