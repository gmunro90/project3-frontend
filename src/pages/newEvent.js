import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URI = process.env.REACT_APP_API_URI;

export default function NewEvent() {
  const [formState, setFormState] = useState({
    sport: "Football",
    numberOfPlayers: 0,
    players: [],
    venue: "",
    date: "",
    time: "",
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
        // setFormState({});
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
        <select
          name="sport"
          id="sport"
          form="sports_form"
          onChange={handleInput}
          value={formState.sport}
        >
          <option value="Football">Football</option>
          <option value="Beach-Volleyball">Beach Volleyball</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Table-Tennis">Table-Tennis</option>
          <option value="Padel">Padel</option>
          <option value="Yoga">Yoga</option>
          <option value="Accessible">Accessible</option>
          <option value="Individual">Individual</option>
        </select>

        <label>Attendees needed</label>
        <input
          type="number"
          name="numberOfPlayers"
          onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
          value={formState.numberOfPlayers}
        />
        <label>Sport</label>

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

        <label>Date</label>
        <input
          type="date"
          name="date"
          onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
          value={formState.date}
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
          value={formState.time}
        />

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
