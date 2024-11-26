// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// import axios from "axios";
// import { useState } from "react";
// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [credentialError, setCredentialError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setCredentialError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/users/login",
//         formData
//       );
//       console.log(response); // Log the response from the server
//       const { fullName, email } = response.data;
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userName", fullName);
//       localStorage.setItem("userEmail", email);
//       console.log(localStorage.getItem("isLoggedIn"));
//       navigate("/list");
//     } catch (error) {
//       console.error("Error during Login:", error); // Handle errors
//       if (error.response && error.response.data) {
//         setCredentialError(error.response.data); // Set the error message from the server
//       } else {
//         setCredentialError("An unexpected error occurred."); // Fallback error message
//       }
//       // Handle error (for example, show error message)
//     }
//   };

//   return (
//     <>
//       <h1 className="Login">Login Form</h1>
//       <form className="Login-Form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           required
//           onChange={handleChange}
//           name="email"
//           value={formData.email}
//           placeholder="Enter Your Email ID"
//         ></input>
//         <input
//           type="password"
//           required
//           name="password"
//           placeholder="Enter Password"
//           onChange={handleChange}
//           value={formData.password}
//         ></input>
//         {credentialError && <p style={{ color: "red" }}>{credentialError}</p>}
//         <input type="submit" className="submit" value="Login"></input>
//         <p className="para-Login">
//           Don't have an Account. Click <Link to="/register">here</Link> to
//           Register.
//         </p>
//       </form>
//     </>
//   );
// };

// export default Login;
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [credentialError, setCredentialError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setCredentialError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        formData
      );
      console.log(response); // Log the response from the server
      const { fullName, email, id } = response.data;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", fullName);
      localStorage.setItem("userEmail", email);
      console.log(localStorage.getItem("userId"));
      onLogin(); // Notify the App component about the login
      navigate("/list"); // Redirect to the list page
    } catch (error) {
      console.error("Error during Login:", error); // Handle errors
      if (error.response && error.response.data) {
        setCredentialError(error.response.data); // Set the error message from the server
      } else {
        setCredentialError("An unexpected error occurred."); // Fallback error message
      }
    }
  };

  return (
    <>
      <h1 className="Login">Login Form</h1>
      <form className="Login-Form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Enter Your Email ID"
        ></input>
        <input
          type="password"
          required
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={formData.password}
        ></input>
        {credentialError && <p style={{ color: "red" }}>{credentialError}</p>}
        <input type="submit" className="submit" value="Login"></input>
        <p className="para-Login">
          Don't have an Account? Click <Link to="/register">here</Link> to
          Register.
        </p>
      </form>
    </>
  );
};

export default Login;
