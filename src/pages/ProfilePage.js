import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";

function ProfilePage(props) {
  const [userGamesList, setUserGamesList] = useState([]);
  const API_URI = process.env.REACT_APP_API_URI;
  const { user, logOutUser } = useContext(AuthContext);
  const [removed, setRemoved] = useState(true);
  const [userClicked, setUserClicked] = useState("MYGAMES");
  //const { id: eventId } = useParams();
  // const eventId = props.match.params.id;
 
  const handleOnClick = () => {
    if (userClicked === "LOGOUT") {
      setUserClicked("MYGAMES");
    } else {
      setUserClicked("LOGOUT");
    }
  };
  
  useEffect(() => {
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URI}/api/profile/${user._id}/usergames`, {
        headers: { Authorization: `Bearer ${localJWTToken}` },
      })
      .then((response) => {
        console.log("response.data", response.data);

        setUserGamesList(response.data);
      })
      .catch(console.log);
  }, [removed]);

  function deletedEvent(eventId) {
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URI}/api/remove/${eventId}/${user._id}`,
        { user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((response) => {
        console.log("message", response.data);
        setRemoved(!removed);
      })
      .catch(console.log);
  }

  return (
    <div>
      <h1>Welcome {user.name}!</h1>

      <button onClick={handleOnClick}>My games</button>
      <button onClick={(handleOnClick, logOutUser)}>Logout</button>
      <>
        {userGamesList.map((event) => {
          return (
            <>
              <p>{event.sport}</p>
              <p>
                Players: {event.players.length}/{event.numberOfPlayers}
              </p>
              <p>{event.venue}</p>
              <p>{event.date}</p>
              <p>{event.time}</p>
              <p>{event.price}</p>
              <button onClick={() => deletedEvent(event._id)}>delete</button>
            </>
          );
        })}
      </>
    </div>
  );
}
export default ProfilePage;

///profile/:userId/usergames
