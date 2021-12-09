import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddTask from "../components/AddTask";
import { useParams } from "react-router";

import TaskCard from "../components/TaskCard";

const API_URI = process.env.REACT_APP_API_URI;

function SportDetailsPage(props) {
  const [sport, setSport] = useState([]);
  const {id: sportId} = useParams()

  // const getProject = () => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .get(`${API_URI}/api/projects/${projectId}`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => {
  //       const oneProject = response.data;
  //       setProject(oneProject);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   getProject();
  // }, []);

  return (
    <div className="ProjectDetails">
      {sport && (
        <>
          <h1>{sportId}</h1>
          <p>{sport.location}</p>
        </>
      )}

      <Link to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
}

export default SportDetailsPage;
