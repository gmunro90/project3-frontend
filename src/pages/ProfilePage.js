import React from "react";
import axios from "axios";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";


function ProfilePage(props) {
  const [userGamesList, setUserGamesList] = useState([]);
  const API_URI = process.env.REACT_APP_API_URI;
  const { user, logOutUser } = useContext(AuthContext);
  const [removed, setRemoved] = useState(true);
  const { search } = useLocation();
  const [userClicked, setUserClicked] = useState("MYGAMES");
  const { sport } = queryString.parse(search);

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
  console.log("user game venue", userGamesList);
  return (
    <div>
      <h1>Welcome {user.name}!</h1>

      <button onClick={handleOnClick}>My games</button>
      <button onClick={(handleOnClick, logOutUser)}>Logout</button>
      <>
        {userGamesList.map((event) => {
          return (
            <div>
              <Link to={`sports/${event._id}`}>
                <ul>
                  <p>{event.sport}</p>
                  <p>
                    Attendees: {event.players.length}/{event.numberOfPlayers}
                  </p>
                  <p>
                    {event.players.map((player) => {
                      return <p>{player.name}</p>;
                    })}
                  </p>
                  <p> {event.venue.name}</p>

                  <p>{event.date}</p>
                  <p>{event.time}</p>
                  <p>{event.price}€</p>
                </ul>
              </Link>
              <button onClick={() => deletedEvent(event._id)}>Leave</button>
            </div>
          );
        })}
      </>
    </div>
  );
}

export default ProfilePage;
