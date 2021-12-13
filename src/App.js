import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EditProjectPage from "./pages/EditProjectPage";
import SportsListPage from "./pages/SportsList";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SportDetailsPage from "./pages/SportDetailsPage"
import mapboxgl from "mapbox-gl";
import NewEvent from "./pages/newEvent";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT
import Venues from "./pages/Venues";
import ProfilePage from "./pages/ProfilePage";


function App() {




  return (
    <div className="App">
      <Navbar />

      <Switch>      
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SportsListPage} />
        <Route exact path="/venues" component={Venues} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />

        




        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/projects" component={SportsListPage} />
        <Route exact path="/sports/:id" component={SportDetailsPage} />
        <PrivateRoute exact path="/projects/edit/:id" component={EditProjectPage} />
        <PrivateRoute exact path="/new" component={NewEvent} />

        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />

      </Switch>
    </div>
  );
}

export default App;
