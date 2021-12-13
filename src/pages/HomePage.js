import { Link } from "react-router-dom";
import events from "../events.json"
import Venues from "./Venues";



function HomePage() {
  const sport = ["Football", "Beach Volleyball", "Basketball", "Table-Tennis", "Tennis", "Padel", "Yoga", "Accessible", "Individual"]

  return (
    <div>
      <h1 className="text-red-500">SPORT BUDDY</h1>

      <div>
      <Link to={`/search?sport=${sport[0]}`}>
      Football
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[1]}`}>
      Beach Volleyball
    </Link>
    </div>
<div>
    <Link to={`/search?sport=${sport[2]}`}>
      Basketball
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[3]}`}>
Table-Tennis
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[4]}`}>
    Tennis
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[5]}`}>
    Padel
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[6]}`}>
    Yoga
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[7]}`}>
    Accessible
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[8]}`}>
    Individual
    </Link>
    </div>
    
    <div>
      <Link to={"/venues"}>VENUES</Link>
    </div>
    <div>
      <Link to={"/new"}>ADD</Link>
    </div>
    </div>

  );
}

export default HomePage;