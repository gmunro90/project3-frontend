 
 import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import loader from "../running-man.gif";

const API_URI = process.env.REACT_APP_API_URI;

function SportsListPage() {
  const [sportList, setSportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { search } = useLocation();
  const { sport } = queryString.parse(search);

  useEffect(() => {
    axios
      .get(`${API_URI}/api/event`)
      .then((response) => {
        console.log("response.data", response.data);
        const filteredSport = response.data.filter(event=> event.sport === sport)
        setSportList(filteredSport)
         setIsLoading(false)
      })
      .catch(console.log);
  }, [sport]);

  // useEffect(() => { 
  //const filteredSport = sportList.filter(event=> event.sport === sport)
  //   setSportList(filteredSport)
  // }, [sport])

  // const getAllSports = () => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .get(`${API_URI}/api/sports`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => setSportList(response.data))
  //     .catch((error) => console.log(error));
  // };

  // // We set this effect will run only once, after the initial render
  // // by setting the empty dependency array - []
  // useEffect(() => {
  //   getAllSports();
  // }, []);
  console.log("filtered", sportList.length);

  return (
    <div className="SportsListPage">
      {isLoading ? (
        <>
          <img src={loader} alt="loading..." width="130" height="130" />
          <p>Loading...</p>
        </>
      ) : (
        <>
          {sportList.map((sport) => {
            console.log("sport", sport);
            console.log("players", sportList)

            return (
              <>
                <Link to={`sports/${sport._id}`}>
                  <h2>{sport.sport} {sport.venue.location.barrio} </h2>
                </Link>
                <p>Players: {sport.players.length}</p>
                <p>{sport.venue.location.barrio}</p>
              </>
            );
          })}
        </>
      )}
    </div>
  );
}
export default SportsListPage;
