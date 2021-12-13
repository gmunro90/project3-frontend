import { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";
import queryString from "query-string"
import { useLocation } from "react-router";
import events from "../events.json"
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const API_URI = process.env.REACT_APP_API_URI;

function SportsListPage() {
  const [sportList, setSportList] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const {search} = useLocation();
  const {sport} = queryString.parse(search)

  useEffect(() => {
    axios
      .get(`${API_URI}/api/event`)
      .then((response) => {
        console.log('response.data', response.data);
        setSportList(response.data);
        const filteredSport = response.data.filter(event=> event.sport === sport)
        setSportList(filteredSport)
        // setIsLoading(false)
        console.log("sportList", sportList)
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

  console.log(sport)
  return (
    <div className="SportsListPage">
      
      {sportList.map((sport) =>  {
        return (
          <>
      <Link to ={`sports/${sport._id}`}><h2>{sport.sport}</h2></Link>
      <p>Players: {sport.players}</p>
      </>
      )
      })}
      </div>

)
}
export default SportsListPage;