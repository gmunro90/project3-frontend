import { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";
import sportsData from ".."
import queryString from "query-string"
import { useLocation } from "react-router";
import events from "../events.json"

const API_URI = process.env.REACT_APP_API_URI;

function SportsListPage() {
  const [sportList, setSportList] = useState([])

  const {search} = useLocation();
  const {sport} = queryString.parse(search)
  
  useEffect(() => {
    const filteredSport = events.filter(event=> event.sport === sport)
    setSportList(filteredSport)
  }, [sport])


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

  return (
    <div className="SportsListPage">
      
      {sportList.map((sport) =>  {
        return (
          <>
      <h2>{sport.sport}</h2>
      <p>{sport.players}</p>
      </>
      )
      })}
      </div>

)
}
export default SportsListPage;
