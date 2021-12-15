import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    const fileFormData = new FormData();
    fileFormData.append("imageUrl", file);
    axios
      .post(`${API_URI}/api/upload`, fileFormData)
      .then((res) => {
        console.log("iaugprghahvoaisare >>>>>>>", res);
        setUploadImage(file.name || "File name missing");
        setprofileImage(res.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  } */

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, profileImage };

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
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
      >
        <form onSubmit={handleSignupSubmit}>
          <label>Email:</label>
          <input
            className="bg-gray-300"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            className="bg-gray-300"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <label>Name:</label>
          <input
            className="bg-gray-300"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />

          <label>Picture</label>
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={uploadImage.name}
          />
          <br />
          <button
            className="shadow-lg mt-4 bg-gray-400 rounded-2xl"
            type="submit"
            value=""
          >
            Sign Up
          </button>
        </form>
        {profileImage && (
          <img src={profileImage} alt="chosen" style={{ height: "300px" }} />
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already a user?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
