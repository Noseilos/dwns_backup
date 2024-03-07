import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
// import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Register.module.css";
import { Fragment, useEffect, useState } from "react";
import PageNav from "../../components/PageNav";
import Spinner from "../../components/Spinner";
import axios from "axios";
import Divider from "@mui/material/Divider";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData
      );
      console.log(response.data); // Assuming your server responds with relevant data
      // Optionally, redirect user or perform other actions upon successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure, e.g., display error message to the user
    }
  };

  return (
    <Fragment>
      <main className={styles.register}>
        <PageNav />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Divider>REGISTER</Divider>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="primary">Register</Button>

          <label>
            <Link className={styles.link} to="/login">Already have an account?</Link>
          </label>
        </form>
      </main>
    </Fragment>
  );
};
export default Register;
