import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";

export default function ProfilePage() {
  return (
    <div>
      <Link to="/myFriends">
        <button>My friends</button>
      </Link>
      <Link to="/myGames">
        <button>My games</button>
      </Link>
      <Link to="/new">
        <button>Create event</button>
      </Link>
    </div>
  );
}
