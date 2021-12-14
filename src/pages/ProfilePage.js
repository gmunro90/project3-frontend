import React from "react";
 import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";
import newEvent from "./newEvent"

function ProfilePage() {
  const [userClicked, setUserClicked] = useState("MYGAMES");
const handleOnClick= ()=>{
  if (userClicked=== "MYFRIENDS") {
    setUserClicked("MYGAMES")
  } else{
    setUserClicked("MYFRIENDS")
  }
}
console.log()
  return (
    <div>
      <button onClick={handleOnClick}>My friends</button>

      <button onClick={handleOnClick}>My games</button>

      {userClicked === "MYFRIENDS" && <h1> my friends </h1>}
      {userClicked === "MYGAMES" && <h1> my games </h1>}
      <Link to="/new">
        <button>Create event</button>
      </Link>
    </div>
  );
}
export default ProfilePage