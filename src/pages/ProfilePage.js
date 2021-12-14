import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";

function ProfilePage() {
  const [userGamesList, setUserGamesList] = useState([]);
  const API_URI = process.env.REACT_APP_API_URI;

  const { user, logOutUser } = useContext(AuthContext);

  const [userClicked, setUserClicked] = useState("MYGAMES");

  const handleOnClick = () => {
    if (userClicked === "LOCOUT") {
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
        const filteredEvents = response.data.filter((event) => event);
        setUserGamesList(filteredEvents);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h1>Welcome {user.name}!</h1>

      <button onClick={handleOnClick}>My games</button>
      <button onClick={handleOnClick, logOutUser}>Logout</button>
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
            </>
          );
        })}
      </>
    </div>
  );
}
export default ProfilePage;

///profile/:userId/usergames
