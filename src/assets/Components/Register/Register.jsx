import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, passwordError: "", confirmPasswordError: "" });
  };

  const validatePassword = (password) => {
    const regexpPassword = /^(?=.*[A-Z])(?=.*[@])(?=.*\d)[A-Za-z\d@]{8,}$/;
    return regexpPassword.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!validatePassword(password)) {
      setErrors({
        ...errors,
        passwordError:
          "Password must be at least 8 characters long, include a capital letter, '@', and a number.",
      });
      return;
    } else {
      setErrors({ ...errors, passwordError: "" });
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPasswordError: "Passwords do not match." });
      return;
    } else {
      setErrors({ ...errors, confirmPasswordError: "" });
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        formData
      );
      console.log(response); // Log the response from the server
      alert("Registration successful!"); // Handle success (for example, show success message)
    } catch (error) {
      console.error("Error during registration:", error); // Handle errors
      alert("Error during registration!"); // Handle error (for example, show error message)
    }
  };
  return (
    <>
      <h1 className="Register">Registration Form</h1>
      <form className="Register-Form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          required
          placeholder="Enter Your Full Name"
          value={formData.fullName}
          onChange={handleChange}
        ></input>
        <input
          type="email"
          required
          placeholder="Enter Your Email ID"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          required
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        {errors.passwordError && (
          <p style={{ color: "red" }}>{errors.passwordError}</p>
        )}
        <input
          type="password"
          required
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        ></input>
        {errors.confirmPasswordError && (
          <p style={{ color: "red" }}>{errors.confirmPasswordError}</p>
        )}
        <input type="submit" className="submit" value="Register"></input>
        <p className="para-Register">
          Already have an Account. Click <Link to="/">here</Link> to sign in.
        </p>
      </form>
    </>
  );
};

export default Register;
