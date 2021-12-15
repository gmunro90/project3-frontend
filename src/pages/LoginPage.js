import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URI = process.env.REACT_APP_API_URI;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URI}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        const JWTToken = response.data.authToken;
        logInUser(JWTToken);
        props.history.push("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <div
        className="flex flex-col
          bg-white
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-40
          w-50
          max-w-md
        "
      >
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            className="bg-gray-300 shadow-sm"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            className="bg-gray-300 shadow-sm"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <br />
          <button
            className="shadow-lg mt-4 bg-gray-400 rounded-2xl"
            type="submit"
          >
            Login
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
<br/>
        <p>Haven't got an account?</p>

        <Link className="font-semibold underline" to={"/signup"}>
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
