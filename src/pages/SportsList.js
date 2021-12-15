import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import loader from "../running-man.gif";
import MultipleMap from "../components/MultipleMap";

const API_URI = process.env.REACT_APP_API_URI;

function SportsListPage() {
  const [sportList, setSportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userClicked, setUserClicked] = useState("events");
  const { search } = useLocation();
  const { sport } = queryString.parse(search);

/*const handleOnClick = (name) => {
  
  console.log(name)
  if(name ==="events"){
    setUserClicked("events")
  }else if(name === "map"){
    setUserClicked("map")
  }
}*/

const handleOnClick = (name) => {
  console.log(name)
  if(name ==="events"){
    setUserClicked("events")
  }else if(name === "map"){
    setUserClicked("map")
  }
}


  useEffect(() => {
    axios
      .get(`${API_URI}/api/event`)
      .then((response) => {
        console.log("response.data", response.data);
        const filteredSport = response.data.filter(
          (event) => event.sport === sport
        );
        setSportList(filteredSport);
        setIsLoading(false);
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

  return (
    <div className="SportsListPage">
    <button name="events" className="bg-transparent text-black-300 font-semibold hover:text-black py-2 px-4 border border-black-900 shadow-lg mb-5" onClick={(e) =>handleOnClick(e.target.name)}>Events</button>
    <button name="map" className="bg-transparent text-black-300 font-semibold hover:text-black py-2 px-4 border border-black-900 shadow-lg mb-5" onClick={(e)=> handleOnClick(e.target.name)}>Map</button>
    

      {isLoading ? (
        <>
          <img className="loading" src={loader} alt="loading..." width="130" height="130" />
          <p>Loading...</p>
        </>
      ) : (
        <>
          {userClicked === "events" ? (
            <>
           

              {sportList.map((sport) => {
                return (
                  <>
                    <div className="border-solid border-2">
                      <Link to={`sports/${sport._id}`}>
                        <div className="flex justify-start ml-3">
                          <div className="font-medium text-xl mt-5">
                            <h2>
                              {sport.venue.name}, {sport.venue.location.barrio}
                            </h2>
                          </div>
                        </div>
                      </Link>

                      <p className="flex justify-start ml-3">
                        {sport.date} @ {sport.time}
                      </p>
                      <p className="flex justify-start ml-3">
                        Attendees: {sport.players.length}/
                        {sport.numberOfPlayers}
                      </p>
                      <br />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <MultipleMap events={[sportList]}></MultipleMap>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default SportsListPage;
