import { Link } from "react-router-dom";
import events from "../events.json"
import Venues from "./Venues";





function HomePage() {
  const sport = ["football", "volleyball", "basketball"]

  return (
    <div>
      <h1>Sport Buddy</h1>
      <div>
      <Link to={`/search?sport=${sport[0]}`}>
      Football
    </Link>
    </div>
    <div>
    <Link to={`/search?sport=${sport[1]}`}>
      Volleyball
    </Link>
    </div>
    
    <Link to={`/search?sport=${sport[2]}`}>
      Basketball
    </Link>
    <div>
      <Link to={"/venues"}>VENUES</Link>
    </div>
    </div>
  );
}

export default HomePage;