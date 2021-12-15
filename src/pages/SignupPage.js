import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URI}/auth/signup`, requestBody)
      .then((response) => props.history.push("/login"))
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <div
        className="flex flex-col
          bg-white
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-20
          w-50
          max-w-md
        "
      >
        <form onSubmit={handleSignupSubmit}>
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

          <label>Name:</label>
          <input
            className="bg-gray-300 shadow-sm"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
          <br />
          <button
            className="shadow-lg mt-4 bg-gray-400 rounded-2xl"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already a user?</p>
      <Link className="font-semibold underline" to={"/login"}>
        {" "}
        Login
      </Link>
    </div>
  );
}

export default SignupPage;
