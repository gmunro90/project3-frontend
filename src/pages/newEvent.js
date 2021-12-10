import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URI = process.env.REACT_APP_API_URI;

export default function NewEvent() {
  const [formState, setFormState] = useState({
    sport: "football",
    numberOfPlayers: "",
    venue: "",
    price: 0,
  });
  const [venueList, setVenueList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const { user } = useContext(AuthContext);
  console.log("user", user);

  useEffect(() => {
    axios
      .get(`${API_URI}/api/venue`)
      .then((response) => {
        console.log("response.data.venues", response.data);
        setVenueList(response.data);
        setIsLoading(false);
        console.log("venues", venueList);
      })
      .catch(console.log);
  }, []);

  function handleSubmit(e) {
    const localJWTToken = localStorage.getItem("authToken");

    e.preventDefault();

    axios
      .post(
        `${API_URI}/api/event/add`,
        { formState, user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((respnse) => {
        setFormState({});
        history.push("/");
      })
      .catch(console.log);
  }

  function handleInput(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value }); // setFormState(Object.assign{}, state, {[e.name]: e.value}))
  }

  console.log("formState", formState);
  return (
    <div className="NewEventPage">
      <h3>Add an event</h3>

      <form onSubmit={handleSubmit}>

        {/* <input
            type="text"
            name="sport"
            onChange={handleInput}         //onChange={(e) => setHeadline(e.target.value)}
            value={formState.headline}
          /> */}

        <label>Players needed</label>
        <input
          type="number"
          name="numberOfPlayers"
          onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
          value={formState.numberOfPlayers}
        />
        <label>Sport</label>

        <select
          name="sport"
          id="sport"
          form="sports_form"
          onChange={handleInput}
          value={formState.sport}
        >
          <option value="football">Football</option>
          <option value="volleyball">Volleyball</option>
          <option value="tennis">Tennis</option>
        </select>
        <label htmlFor="venue">Venue</label>

        <select
          name="venue"
          id="venue"
          form="sports_form"
          onChange={handleInput}
          value={formState.venue}
        >
          {venueList.map((venue) => {

            return <option value={venue._id}>{venue.name}</option>;
          })}
        </select>

        <label>Price</label>
        <input
          type="number"
          name="price"
          onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
          value={formState.price}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
