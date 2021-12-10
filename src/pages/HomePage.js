import { Link } from "react-router-dom";
import events from "../events.json"





function HomePage() {
  const sport = ["football", "volleyball", "basketball"]

  return (
    <div>
      <h1>Sport Buddy</h1>
      <Link to={`/search?sport=${sport[0]}`}>
      Football
    </Link>
    <Link to={`/search?sport=${sport[1]}`}>
      Volleyball
    </Link>
    <Link to={`/search?sport=${sport[2]}`}>
      Basketball
    </Link>
    </div>
  );
}

export default HomePage;