import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";    // <== IMPORT
import AnonRoute from "./components/AnonRoute";        // <== IMPORT

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>      
        <Route exact path="/" component={HomePage} />

        {/* 👇 UPDATE THE EXISTING ROUTES 👇  */}
        <PrivateRoute exact path="/projects" component={ProjectListPage} />
        <PrivateRoute exact path="/projects/:id" component={ProjectDetailsPage} />
        <PrivateRoute exact path="/projects/edit/:id" component={EditProjectPage} />
        
        <AnonRoute exact path="/signup" component={SignupPage} />
        <AnonRoute exact path="/login" component={LoginPage} />

      </Switch>
    </div>
  );
}

export default App;
